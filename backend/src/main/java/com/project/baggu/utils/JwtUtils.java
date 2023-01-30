package com.project.baggu.utils;

import com.project.baggu.domain.TokenInfo;
import io.jsonwebtoken.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

public class JwtUtils {

    private static String SECRET_KEY = Base64.getEncoder().encodeToString("jwt-temp-secret-key".getBytes());

    //access 토큰 15분
    private static final long ACCESS_PERIOD = 1000L * 60L * 15L;

    //refresh 토큰 하루
    private static final long REFRESH_PERIOD = 1000L * 60L * 60L * 24L;

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
        return req.getHeader("access-token");
    }


}
