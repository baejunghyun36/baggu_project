package com.project.baggu.service;

import com.project.baggu.dto.BaseResponseStatus;
import com.project.baggu.exception.BaseException;
import com.project.baggu.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

  public String renewAccessToken(String refreshToken) throws BaseException {

    //refreshToken에서 userIdx, role 뽑아내기
    Long userIdx = Long.parseLong(JwtUtils.getClaimAttribute(refreshToken, "userIdx"));
    String role = JwtUtils.getClaimAttribute(refreshToken, "role");

    //주어진 refresh token이 유효한지
    if(!JwtUtils.isValidToken(refreshToken)){
      throw new BaseException(BaseResponseStatus.TOKEN_EXPIRED);
    }

//    //추가! userIdx로 refresh token 가져오고 존재 여부 파악하기
//    String storedRefreshToken = jwtTokenRepository.getRefershToken(userIdx);
//    //refresh token 존재하는지
//    if(storedRefreshToken==null){
//      throw new BaseException(BaseResponseStatus.UNVALID_TOKEN);
//    }

    //악의적인 접근이 없는지?
    //if(storedRefreshToken 최근 접근 시각이 3분도 지나지 않았다면)
    //Date now = new Date(Date.now()+TOKEN_ACCESS_LIMIT);
    //if(token.lastAccessTime<now)
    //throw new BaseException

    //refresh token이 유효한지?
    if(!JwtUtils.isValidToken(refreshToken)){
      throw new BaseException(BaseResponseStatus.TOKEN_EXPIRED);
    }

    return JwtUtils.allocateToken(userIdx,role).getAccessToken();
  }

  //redis에 refresh 토큰 저장하는 부분
//  public void saveRefreshToken(Long userIdx, String refreshToken){
//    jwtTokenRepository.saveRefreshToken(userIdx, refreshToken);
//  }

}
