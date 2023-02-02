package com.project.baggu.config.filter;

import com.project.baggu.utils.JwtTokenProvider;
import com.project.baggu.utils.JwtTokenUtils;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    private final String excludeUrl = "/auth/login/kakao";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwt = JwtTokenUtils.resolveAccessToken(request);

        //jwt가 없다면 -> 다음 필터로
        if(!StringUtils.hasText(jwt)){
            filterChain.doFilter(request, response);
            return;
        }

        //login 요청의 경우 다음 필터로
        if ((request.getRequestURI()).equals(excludeUrl)) {
            filterChain.doFilter(request, response);
            return;
        }

        try{
            //유효할 경우
            if(JwtTokenUtils.isValidToken(jwt)){
                Authentication authentication = jwtTokenProvider.getAuthentication(jwt); // 정상 토큰이면 SecurityContext 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else{ //만료된 경우
                throw new ServletException();
            }
        } catch (ServletException e){ //만료된 경우
            request.setAttribute("exception", "EXPIRED_TOKEN");
        } catch (MalformedJwtException e){
            request.setAttribute("exception", "UNVALID_TOKEN");
        }

        doFilter(request, response, filterChain);
    }
}
