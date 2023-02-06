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

//    config.setAllowCredentials(true);
    // config.addAllowedOrigin("*");
    config.addAllowedOriginPattern("https://**"); // addAllowedOriginPattern("*") 대신 사용
    config.addAllowedOriginPattern("http://**"); // addAllowedOriginPattern("*") 대신 사용
    config.addAllowedOrigin("https//test.baggu.shop/**");
    config.addAllowedOrigin("http://localhost:3000");
    config.addAllowedOrigin("https://localhost:3000");
    config.addAllowedOrigin("http://localhost:8080");
//    config.addAllowedHeader("*");
    config.addAllowedOrigin("http://localhost:9999");
    config.addAllowedMethod("PUT");
    config.addAllowedMethod("OPTIONS");
    config.addAllowedMethod("GET");
    config.addAllowedMethod("POST");
    config.addAllowedMethod("DELETE");
//    config.addAllowedMethod("OPTIONS");
//
//    config.addAllowedMethod(
//                HttpMethod.GET.name(),
//                HttpMethod.HEAD.name(),
//                HttpMethod.POST.name(),
//                HttpMethod.PUT.name(),
//                HttpMethod.DELETE.name());
    source.registerCorsConfiguration("/**", config);
    config.addAllowedHeader("Authorization");
    config.addAllowedHeader("Content-Type");
    config.addExposedHeader("Authorization");
    config.addExposedHeader("Content-Type");

    return new CorsFilter(source);
  }

}
