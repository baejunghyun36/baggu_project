package com.project.baggu.Security;

import com.project.baggu.dto.JwtTokenAuthenticationToken;
import com.project.baggu.utils.JwtTokenUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.Collection;
import java.util.Collections;

public class WithMockCustomUserSecurityContextFactory implements WithSecurityContextFactory<WithMockCustomTokenAccount> {

    @Override
    public SecurityContext createSecurityContext(WithMockCustomTokenAccount mockUser) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        String role = mockUser.role().getKey();
        Collection<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(role));
        String userIdx = mockUser.userIdx();

        JwtTokenAuthenticationToken tk = new JwtTokenAuthenticationToken(authorities, userIdx, true);

        context.setAuthentication(tk);
        return context;
    }
}