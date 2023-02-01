package com.project.baggu.service;

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
import java.io.IOException;
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

  private AmazonS3 amazonS3Client;

  @PostConstruct
  private void init(){
    this.localDir = System.getProperty("user.dir") + staticDir;

    //임시 로컬 저장소가 없을 경우 생성
    makeDirectory(localDir);

    //amazonS3Client 생성
     this.amazonS3Client = AmazonS3ClientBuilder
        .standard()
        .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(acceesKey, privateKey)))
        .withRegion(Regions.AP_NORTHEAST_2)
        .build();
  }

  public ArrayList<String> upload(List<MultipartFile> multipartFiles, String dirName) throws Exception{
    ArrayList<String> uploadUrls = new ArrayList<>();

    multipartFiles.forEach((file) -> {
      try {
        uploadUrls.add(upload(file,dirName));
      } catch (IOException e) {
        throw new BaseException(BaseResponseStatus.FILE_UPLOAD_ERROR);
      }
    });

    return uploadUrls;
  }

  public String upload(MultipartFile multipartFile, String dirName)
      throws IOException, BaseException {
    //로컬 저장 후 업로드 가능 형태로 변환
    File uploadFile = convert(multipartFile)
        .orElseThrow(() -> new BaseException(BaseResponseStatus.FILE_CONVERT_ERROR));

    try{
      //S3로 파일 업로드
      String fileName = dirName + "/" + uploadFile.getName();
      String uploadUrl = putS3(uploadFile, bucket, fileName);

      //로컬 파일 삭제
      removeLocalFile(uploadFile);

      return uploadUrl;
    } catch(Exception e){
      throw new BaseException(BaseResponseStatus.FILE_UPLOAD_ERROR);
    }
  }

  public boolean delete(String uploadUrl){
    try{
      String fileObjectKey = uploadUrl.replace("https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/","");
      amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileObjectKey));
    } catch(Exception e){
      return false;
    }
    return true;
  }

  private void removeLocalFile(File file){
    file.delete();
  }

  // S3로 업로드
  private String putS3(File uploadFile, String bucket, String fileName) {
    amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
        CannedAccessControlList.PublicRead));
    return amazonS3Client.getUrl(bucket, fileName).toString();
  }


  //로컬 저장 후 파일 반환
  private Optional<File> convert(MultipartFile multipartFile) throws BaseException {
    try{
      isValidFile(multipartFile);

      String originalFileName = multipartFile.getOriginalFilename();
      String newFileName = createNewFileName(originalFileName);

      File file = new File(localDir + newFileName);
      multipartFile.transferTo(file);

      return Optional.of(file);
    } catch(Exception e){
      throw new BaseException(BaseResponseStatus.FILE_CONVERT_ERROR);
    }
  }

  //파일명 난수화
  private String createNewFileName(String originalFileName) throws BaseException {
    String extension = getExtension(originalFileName);
    String uuid = UUID.randomUUID().toString();
    return uuid+"."+extension;
  }

  //파일 확장자 검사 후 추출
  private String getExtension(String originalFileName) throws BaseException {
    String extension = originalFileName.substring(originalFileName.lastIndexOf(".")+1);
    if(extension==null || !(extension.equals("png") || extension.equals("jpg") || extension.equals("jpeg"))){
      throw new BaseException(BaseResponseStatus.REQUEST_ERROR);
    }
    return extension;
  }

  //제대로 된 파일인지 확인
  private void isValidFile(MultipartFile file) throws BaseException {
    if(file.isEmpty() || file.getSize()==0){
      throw new BaseException(BaseResponseStatus.REQUEST_ERROR);
    }
  }


  private void makeDirectory(String fileDir) {
    File Folder = new File(fileDir);

    if (!Folder.exists()) {
      try {
        Folder.mkdir(); //폴더 생성합니다.
      } catch (Exception e) {
        e.getStackTrace();
      }
    }
  }

}