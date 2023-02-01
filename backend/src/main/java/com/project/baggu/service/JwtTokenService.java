package com.project.baggu.service;

import com.project.baggu.dto.BaseResponseStatus;

import com.project.baggu.domain.RefreshToken;
import com.project.baggu.exception.BaseException;
import com.project.baggu.repository.RefreshTokenRepository;
import com.project.baggu.utils.JwtTokenUtils;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

  private final RefreshTokenRepository refreshTokenRepository;
  private static final long  ACCESS_PERIOD_MINUTE =JwtTokenUtils.getAccessPeriod()/(1000*60);
  public String renewAccessToken(String refreshToken) throws BaseException {

    //refreshToken에서 userIdx, role 뽑아내기
    Long userIdx = Long.parseLong(JwtTokenUtils.getClaimAttribute(refreshToken, "userIdx"));
    String role = JwtTokenUtils.getClaimAttribute(refreshToken, "role");

    LocalDateTime recentAccessProvideTime;
    //주어진 refresh token이 유효한지
    if(!JwtTokenUtils.isValidToken(refreshToken)){
      throw new JwtException("유효하지 않습니다");
    }

      //추가! userIdx로 refresh token 가져오고 존재 여부 파악하기
      RefreshToken rf = refreshTokenRepository.findById(String.valueOf(userIdx))
          .orElseThrow(()-> new BaseException(BaseResponseStatus.TOKEN_EXPIRED));

      //최근 엑세스토큰 공급시간이 ACCESSTOKEN유효시간 전이라면
      recentAccessProvideTime = rf.getAccessProvideTime();
      if(LocalDateTime.now()
          .isBefore(recentAccessProvideTime.plusMinutes(ACCESS_PERIOD_MINUTE))
      ){
        throw new BaseException(BaseResponseStatus.DUPLICATE_LOGIN);
      }


      return JwtTokenUtils.allocateToken(userIdx,role).getAccessToken();
    }

    public void saveRefreshToken(Long userIdx, String refreshToken){
      //로그인 중인지 확인
      if(refreshTokenRepository.findById(String.valueOf(userIdx)).isPresent()){
        throw new BaseException(BaseResponseStatus.DUPLICATE_LOGIN);
      }else{
        refreshTokenRepository.
            save(
                RefreshToken.builder().
                    userIdx(String.valueOf(userIdx)).
                    refreshToken(refreshToken).
                    accessProvideTime(LocalDateTime.now()).
                    build()
            );
      }
    }

  }