package com.project.baggu.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.filter.OncePerRequestFilter;

/*
filter exception handler의 경우는 authentication이 아닌 authorization에서 생긴 오류를 잡는데 사용하는 경우가 많음.
이미 authentication entry point가 생성되어있기 때문에 사용이 되진 않는다.
 */
public class FilterExceptionHandler extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
  ) throws ServletException, IOException {

    try{
      filterChain.doFilter(request, response);
    }catch (ExpiredJwtException e){
      //토큰의 유효기간 만료
      setErrorResponse(response, BaseResponseStatus.ACCESS_TOKEN_EXPIRED);
    }catch (JwtException | IllegalArgumentException e){
      //유효하지 않은 토큰
      setErrorResponse(response, BaseResponseStatus.UNVALID_TOKEN);
    }catch(BaseException e){
      setErrorResponse(response, BaseResponseStatus.DUPLICATE_LOGIN);
    }
  }
  private void setErrorResponse(
      HttpServletResponse response,
      BaseResponseStatus status
  ){
    ObjectMapper objectMapper = new ObjectMapper();
    response.setStatus(status.getStatus().value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    ErrorResponse errorResponse = new ErrorResponse(status.getStatus().value(), status.getMessage());
    try{
      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }catch (IOException e){
      e.printStackTrace();
    }
  }

  @Data
  public static class ErrorResponse{
    private final Integer code;
    private final String message;
  }
}
