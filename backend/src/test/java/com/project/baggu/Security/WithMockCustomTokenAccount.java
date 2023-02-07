package com.project.baggu.Security;

import com.project.baggu.domain.enumType.Role;
import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockCustomTokenAccount {

    String userIdx();
    Role role() default Role.TYPE5;
}
