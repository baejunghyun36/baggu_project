package com.project.baggu.config;

import com.amazonaws.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
  @Bean
  public CorsFilter corsFilter() {

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();

    //origin 설정
    config.addAllowedOriginPattern("*");
//    config.addAllowedOrigin("https://test.baggu.shop"); //test 서버
//    config.addAllowedOrigin("http://test.baggu.shop"); //test 서버
//    config.addAllowedOrigin("http://localhost:3000"); //frontend local test용
//    config.addAllowedOrigin("http://localhost:8080"); //backend local test용
//    config.addAllowedOrigin("https://baggu.shop"); //deploy 서버
//    config.addAllowedOrigin("http://baggu.shop"); //deploy 서버


    //method 설정
    config.addAllowedMethod("PUT");
    config.addAllowedMethod("OPTIONS");
    config.addAllowedMethod("GET");
    config.addAllowedMethod("POST");
    config.addAllowedMethod("DELETE");

    //custom header 설정
    config.addAllowedHeader("Authorization");
    config.addAllowedHeader("Content-Type");
    config.addExposedHeader("Authorization");

    //모든 패턴 요청에 대해 해당 config 등록
    source.registerCorsConfiguration("/**", config);

    return new CorsFilter(source);

    //이하 주석은 해당 cors config 정상작동 확인 후 삭제 예정
//    config.addAllowedOriginPattern("https://**"); // addAllowedOriginPattern("*") 대신 사용
//    config.addAllowedOriginPattern("http://**"); // addAllowedOriginPattern("*") 대신 사용
//    config.addAllowedOrigin("https://localhost:3000");
//    config.addAllowedOrigin("http://localhost:8080");
//    config.addAllowedHeader("*");
//    config.addAllowedOrigin("http://localhost:9999");
//    config.addAllowedMethod("OPTIONS");
//
//    config.addAllowedMethod(
//                HttpMethod.GET.name(),
//                HttpMethod.HEAD.name(),
//                HttpMethod.POST.name(),
//                HttpMethod.PUT.name(),
//                HttpMethod.DELETE.name());

  }

}
