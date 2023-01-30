package com.project.baggu.repository;

import java.util.HashMap;
import org.springframework.stereotype.Repository;

@Repository
public class TokenRepository {

  private HashMap<String, String> refreshMap;

  public TokenRepository(){
    refreshMap = new HashMap<>();
  }

  public void addRefreshToken(String token, String email){
    refreshMap.put(email,token);
  }

  public boolean isValidRefreshToken (String token, String email){
    if(refreshMap.get(email)==null || !refreshMap.get(email).equals(token)){
      return false;
    } else{
      return true;
    }
  }





}
