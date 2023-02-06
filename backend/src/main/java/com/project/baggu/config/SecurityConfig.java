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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;

@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
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

  //정적 리소스에 대한 허용
  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
        .antMatchers("/resources/", "/error", "/favicon.ico", "/swagger*/**");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    //security 기능 관련 설정
    http.cors().and()
        .httpBasic().disable() //rest니까 http 기본 설정 꺼주고
        .csrf().disable() //마찬가지로 csrf 검사 꺼주고
        .formLogin().disable() //form 로그인 형식 인증 꺼주고
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); //세션 사용하지 않는다.

    //uri 설정
    //"/auth/callback/**"은 카카오 로그인 리다이렉션 url로 사용하기 위해 임시 지정
    http.authorizeRequests()
            .antMatchers("/", "/baggu/auth/**", "/swagger*/**" ).permitAll()
            .anyRequest().authenticated();

    //oauth2 설정
    http.oauth2Login()
        .successHandler(oAuth2UserSuccessHandler)
        .failureHandler(oAuth2UserFailureHandler)
        .loginProcessingUrl("/baggu/auth/login/*")
        .authorizationEndpoint().authorizationRequestRepository(
            oAuth2CookieAuthorizationRequestRepository)
        .and().userInfoEndpoint().userService(oAuth2UserService)
            .and().permitAll();

    //jwt custom filter 및 entry point 설정
    http.addFilterBefore(new JwtTokenFilter(new JwtTokenProvider()), OAuth2AuthorizationRequestRedirectFilter.class)
        .exceptionHandling()
        .authenticationEntryPoint(new JwtTokenAuthenticationEntryPoint());

    //logout 설정
    http.logout()
        .logoutUrl("/baggu/auth/logout")
        .deleteCookies("refresh-token")
        .logoutSuccessHandler(customLogoutSuccessHandler);
//        .addLogoutHandler(new LogoutProcessHandler());
    //error handler 적용
    http.addFilterBefore(new FilterExceptionHandler(), JwtTokenFilter.class);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }


}
