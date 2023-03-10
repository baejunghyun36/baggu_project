package com.project.baggu.config;

import com.project.baggu.config.filter.JwtTokenFilter;
import com.project.baggu.config.oauth.handler.CustomLogoutSuccessHandler;
import com.project.baggu.config.oauth.handler.OAuth2UserFailureHandler;
import com.project.baggu.config.oauth.handler.OAuth2UserSuccessHandler;
import com.project.baggu.config.token.JwtTokenAuthenticationEntryPoint;
import com.project.baggu.exception.FilterExceptionHandler;
import com.project.baggu.repository.OAuth2CookieAuthorizationRequestRepository;
import com.project.baggu.service.OAuth2UserService;
import com.project.baggu.utils.JwtTokenProvider;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private OAuth2UserService oAuth2UserService;

  @Autowired
  private OAuth2CookieAuthorizationRequestRepository oAuth2CookieAuthorizationRequestRepository;

  @Autowired
  private OAuth2UserFailureHandler oAuth2UserFailureHandler;

  @Autowired
  private OAuth2UserSuccessHandler oAuth2UserSuccessHandler;

  @Autowired
  private CustomLogoutSuccessHandler customLogoutSuccessHandler;

  //?????? ???????????? ?????? ??????
  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
        .antMatchers("/resources/", "/error", "/favicon.ico", "/swagger*/**");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    //security ?????? ?????? ??????
    http.cors().configurationSource(corsConfigurationSource()).and()
        .httpBasic().disable() //rest?????? http ?????? ?????? ?????????
        .csrf().disable() //??????????????? csrf ?????? ?????????
        .formLogin().disable() //form ????????? ?????? ?????? ?????????
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); //?????? ???????????? ?????????.

    //uri ??????
    //"/auth/callback/**"??? ????????? ????????? ??????????????? url??? ???????????? ?????? ?????? ??????
    http.authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS,"/*/**").permitAll()
        .antMatchers("/", "/baggu/auth/**", "/swagger*/**" ).permitAll()
        .antMatchers(HttpMethod.POST, "/baggu/user").permitAll()
        .anyRequest().authenticated();

    //oauth2 ??????
    http.oauth2Login()
        .successHandler(oAuth2UserSuccessHandler)
        .failureHandler(oAuth2UserFailureHandler)
        .loginProcessingUrl("/baggu/auth/login/*")
        .authorizationEndpoint().authorizationRequestRepository(
            oAuth2CookieAuthorizationRequestRepository)
        .and().userInfoEndpoint().userService(oAuth2UserService)
        .and().permitAll();

    //jwt custom filter ??? entry point ??????
    http.addFilterBefore(new JwtTokenFilter(new JwtTokenProvider()), OAuth2AuthorizationRequestRedirectFilter.class)
        .exceptionHandling()
        .authenticationEntryPoint(new JwtTokenAuthenticationEntryPoint());


//        .addLogoutHandler(new LogoutProcessHandler());
    //error handler ??????
    http.addFilterBefore(new FilterExceptionHandler(), JwtTokenFilter.class);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.addAllowedOriginPattern("*");

    //custom header ??????
    configuration.addAllowedHeader("Authorization");
    configuration.addAllowedHeader("Content-Type");
    configuration.addAllowedHeader("refresh-token");
    configuration.addExposedHeader("Authorization");
    configuration.addExposedHeader("Content-Type");
    configuration.addExposedHeader("refresh-token");

    configuration.addAllowedMethod("*");
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
