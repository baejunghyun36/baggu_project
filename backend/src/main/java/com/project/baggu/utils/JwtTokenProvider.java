package com.project.baggu.utils;

import com.project.baggu.dto.JwtTokenAuthenticationToken;
import java.util.Collection;
import java.util.Collections;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider implements AuthenticationProvider {

  // token에 담겨있는 정보를 이용해 Authentication 객체를 리턴
  public Authentication getAuthentication(String token) {

    String role = JwtTokenUtils.getClaimAttribute(token, "role");
    Collection<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(role));
    String userIdx = JwtTokenUtils.getClaimAttribute(token, "userIdx");

    JwtTokenAuthenticationToken tk = new JwtTokenAuthenticationToken(authorities, userIdx, true);
    return tk;
  }

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    return null;
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return false;
  }
}