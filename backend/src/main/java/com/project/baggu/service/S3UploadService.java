package com.project.baggu.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.project.baggu.exception.BaseException;

import com.project.baggu.exception.BaseResponseStatus;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3UploadService {

  @Value("${aws_access_key}")
  private String acceesKey;

  @Value("${aws_private_key}")
  private String privateKey;

  @Value("${aws_bucket}")
  private String bucket;

  @Value("${env_staticDir}")
  private String staticDir;

  private String localDir;

  private final String CLOUD_FRONT_DOMAIN = "https://d9f4zibn3mxwq.cloudfront.net/";
  private final String S3_DOMAIN = "https://bagguimg.s3.ap-northeast-2.amazonaws.com/";

  private AmazonS3 amazonS3Client;

  @PostConstruct
  private void init() {
    //실제 프로젝트 경로와 대상 폴더 경로를 합쳐 최종 저장 디렉토리 생성
    String superDir = "/app/s3";

    this.localDir = staticDir;


    //임시 로컬 저장소가 없을 경우 생성
    makeDirectory(superDir);
    makeDirectory(localDir);

    //amazonS3Client 생성
    this.amazonS3Client = AmazonS3ClientBuilder
        .standard()
        .withCredentials(
            new AWSStaticCredentialsProvider(new BasicAWSCredentials(acceesKey, privateKey)))
        .withRegion(Regions.AP_NORTHEAST_2)
        .build();
  }

  public ArrayList<String> upload(List<MultipartFile> multipartFiles, String dirName) {

    ArrayList<String> uploadUrls = new ArrayList<>();

    multipartFiles.forEach((file) -> uploadUrls.add(upload(file, dirName)));
    return uploadUrls;
  }

  public String upload(MultipartFile multipartFile, String dirName) {

      //로컬 저장 후 업로드 가능 형태로 변환
      File uploadFile = convert(multipartFile)
          .orElseThrow(() -> new BaseException(BaseResponseStatus.FILE_SAVE_ERROR));

      //S3로 파일 업로드
      String fileName = dirName + "/" + uploadFile.getName();
      String uploadUrl =
          CLOUD_FRONT_DOMAIN + putS3(uploadFile, bucket, fileName).replace(S3_DOMAIN, "");

      //로컬 파일 삭제
      removeLocalFile(uploadFile);

      return uploadUrl;

  }

  public boolean delete(String uploadUrl) {
    try {
      String fileObjectKey = uploadUrl.replace(
          "https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/", "");
      amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileObjectKey));
    } catch (Exception e) {
      return false;
    }
    return true;
  }

  private void removeLocalFile(File file) {
    try {
      file.delete();
    } catch (SecurityException se) {
      throw new BaseException(BaseResponseStatus.FILE_DELETE_ERROR);
    }
  }

  // S3로 업로드
  private String putS3(File uploadFile, String bucket, String fileName) {
    try {

      amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
          CannedAccessControlList.PublicRead));
      return amazonS3Client.getUrl(bucket, fileName).toString();

    } catch (AmazonServiceException ase) {
      throw new BaseException(BaseResponseStatus.FILE_SAVE_ERROR);
    } catch (SdkClientException sce) {
      throw new BaseException(BaseResponseStatus.S3_CLIENT_ERROR);
    }
  }


  //로컬 저장 후 파일 반환
  private Optional<File> convert(MultipartFile multipartFile) {
    try {
      isValidFile(multipartFile);

      String originalFileName = multipartFile.getOriginalFilename();  //들어온 파일명
      String newFileName = createNewFileName(originalFileName); //난수회된 파일명

      File file = new File(localDir + newFileName); //파일 로컬에 저장
      multipartFile.transferTo(file);

      return Optional.of(file);
    } catch (Exception e) {
      throw new BaseException(BaseResponseStatus.FILE_SAVE_ERROR, e.toString());
    }
  }

  //파일명 난수화
  private String createNewFileName(String originalFileName) {
    String extension = getExtension(originalFileName);
    String uuid = UUID.randomUUID().toString();
    return uuid + "." + extension;
  }

  //파일 확장자 검사 후 추출
  private String getExtension(String originalFileName) {

    try{
      String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1)
          .toLowerCase();
      if(!(extension.equals("png") || extension.equals("jpg") || extension.equals("jpeg"))) {
        throw new BaseException(BaseResponseStatus.FILE_FORMAT_ERROR);
      }
      return extension;
    } catch(IndexOutOfBoundsException iob){
      throw new BaseException(BaseResponseStatus.FILE_FORMAT_ERROR);
    }
  }

  //제대로 된 파일인지 확인
  private void isValidFile(MultipartFile file) throws BaseException {
    if (file.isEmpty() || file.getSize() == 0) {
      throw new BaseException(BaseResponseStatus.FILE_UPLOAD_ERROR);
    }
  }


  private void makeDirectory(String fileDir) {
    try {
      File Folder = new File(fileDir);
      if (!Folder.exists()) {
        if(!Folder.mkdir()){
          throw new Exception();
        }
      }
    } catch (Exception e) {
      throw new BaseException(BaseResponseStatus.FILE_DIRECTORY_MAKE_ERROR, e.toString());
    }
  }
}