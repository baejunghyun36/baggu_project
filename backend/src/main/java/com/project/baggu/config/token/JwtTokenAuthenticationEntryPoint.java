package com.project.baggu.config.token;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.dto.BaseMessageResponse;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

//Spring Security 내에서 전역적으로 사용되는 EntryPoint이나
//jwt 관련 에러 핸들링만을 커스터마이징 했기 때문에 다음과 같이 명명함
@Component
public class JwtTokenAuthenticationEntryPoint implements AuthenticationEntryPoint {

  private ObjectMapper objectMapper = new ObjectMapper();
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
    String exception = (String)request.getAttribute("exception");

    //jwt filter가 아닌 다른 곳에서 발생한 인증 오류
    if(exception==null){
      response.setStatus(401);
    } else{
      setJwtErrorResponse(response, exception);
    }
  }

  private void setJwtErrorResponse(HttpServletResponse response, String errorMessage) throws IOException {
    //헤더 설정
    response.setContentType("application/json");
    response.setCharacterEncoding("utf-8");

    //응답 객체 생성
    BaseMessageResponse baseMessageResponse = new BaseMessageResponse(errorMessage);

    //json으로 변환하여 response에 저장
    String stringResponseData = objectMapper.writeValueAsString(baseMessageResponse);
    response.getWriter().write(stringResponseData);
  }
}