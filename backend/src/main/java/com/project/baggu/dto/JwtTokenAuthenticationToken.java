package com.project.baggu.dto;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import javax.security.auth.Subject;
import java.util.Collection;

public class JwtTokenAuthenticationToken extends AbstractAuthenticationToken {

    private String userIdx;

    /**
     * Creates a token with the supplied array of authorities.
     *
     * @param authorities the collection of <tt>GrantedAuthority</tt>s for the principal
     *                    represented by this authentication object.
     */
    public JwtTokenAuthenticationToken(Collection<? extends GrantedAuthority> authorities, String userIdx, boolean isAuthenticated) {
        super(authorities);
        this.setAuthenticated(isAuthenticated);
        this.userIdx = userIdx;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return userIdx;
    }

}
