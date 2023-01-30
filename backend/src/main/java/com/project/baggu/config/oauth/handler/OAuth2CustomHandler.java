package com.project.baggu.config.oauth.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.baggu.domain.OAuth2KakaoUser;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

public interface OAuth2CustomHandler {
  public abstract void writeJsonResponse(HttpServletResponse response, OAuth2KakaoUser oAuth2KakaoUser)
      throws IOException;
}
