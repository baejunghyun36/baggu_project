package com.project.baggu.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.baggu.dto.BaseResponseStatus;
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
      setErrorResponse(response, BaseResponseStatus.TOKEN_EXPIRED);
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
