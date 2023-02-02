package com.project.baggu.utils;

import com.project.baggu.domain.TokenInfo;
import com.project.baggu.domain.enumType.Role;
import io.jsonwebtoken.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;

public class JwtTokenUtils {

    private static final String SECRET_KEY = Base64.getEncoder().encodeToString("jwt-temp-secret-key".getBytes());


    //access 토큰 15분
    private static final long ACCESS_PERIOD = 1000L * 60L * 15L;

    //refresh 토큰 하루
    private static final long REFRESH_PERIOD = 1000L * 60L * 60L * 24L;

    //개발용 access 토큰 30일
    private static final long DEV_ACCESS_PERIOD = 1000L * 60L * 60L * 24L * 30L;

    //userIdx와 role로 토큰 발급
    public static TokenInfo allocateToken(Long userIdx, String role) {

        JwtBuilder jwtBuilder = Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT");

        jwtBuilder.claim("userIdx",userIdx);
        jwtBuilder.claim("role", role);

        Date now = new Date();
        return new TokenInfo(
                jwtBuilder.setIssuedAt(now)
                        .setExpiration(new Date(now.getTime()+ACCESS_PERIOD))
                        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                        .compact(),
                jwtBuilder.setIssuedAt(now)
                        .setExpiration(new Date(now.getTime()+REFRESH_PERIOD))
                        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                        .compact()
        );
    }

    public static Claims getClaims(String token){
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public static String getClaimAttribute(String token, String key){
        return getClaims(token).getOrDefault(key,null).toString();
    }

    //토큰 시간 지났는지 검사
    public static boolean isValidToken(String token) throws MalformedJwtException{
            Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
    }

    public static String resolveAccessToken(HttpServletRequest req) {
        return req.getHeader("Authorization");
    }

    public static String allocateDevToken(Long userIdx) {

        JwtBuilder jwtBuilder = Jwts.builder()
            .setHeaderParam("alg", "HS256")
            .setHeaderParam("typ", "JWT");

        jwtBuilder.claim("userIdx",userIdx);
        jwtBuilder.claim("role", Role.TYPE5);

        Date now = new Date();

        return jwtBuilder.setIssuedAt(now)
                .setExpiration(new Date(now.getTime()+DEV_ACCESS_PERIOD))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }


    public static long getAccessPeriod(){
        return ACCESS_PERIOD;
    }

    public static long getRefreshPeriod(){
        return REFRESH_PERIOD;
    }
}
