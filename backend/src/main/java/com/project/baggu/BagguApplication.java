package com.project.baggu;

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import java.io.File;
import javax.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
// JPA Auditing 활성화(날짜)
@EnableJpaAuditing
@EnableCaching
public class BagguApplication {

	public static void main(String[] args) {
		SpringApplication.run(BagguApplication.class, args);
	}

	//s3 파일 저장 전 로컬 임시 저장소가 필요합니다.
	@PostConstruct
	private void init() {

//    if (environment.equals("local")) {
      String staticFolder = System.getProperty("user.dir") + "/src/main/resources/static";
//      mkdirResource(staticFolder);
//
//      String files = System.getProperty("user.dir") + fileDir;
//      mkdirResource(files);
//    } else if (environment.equals("development")) {
//		String filesFolder = "/var/www/html/files";
		mkdirResource(staticFolder);

	}

	/**
	 * @param fileDir 생성을 위한 폴더명
	 * @description 주어진 경로에 폴더를 생성함
	 */
	private static void mkdirResource(String fileDir) {
		File Folder = new File(fileDir);

		// 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
		if (!Folder.exists()) {
			try {
				Folder.mkdir(); //폴더 생성합니다.
			} catch (Exception e) {
				e.getStackTrace();
			}
		}
	}

	@Bean
	Hibernate5Module hibernate5Module() {
		Hibernate5Module hibernate5Module = new Hibernate5Module();
		//강제 지연 로딩 설정
		hibernate5Module.configure(Hibernate5Module.Feature.FORCE_LAZY_LOADING, true);
		return hibernate5Module;
	}
}