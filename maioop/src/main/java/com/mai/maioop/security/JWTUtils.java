package com.mai.maioop.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JWTUtils {
    @Value("${jwt_secret}")
    private String jwtSecret;

    @Value("${jwt_name}")
    private String jwtName;

    public String getJWT(HttpServletRequest httpRequest) {
        Cookie cookie = WebUtils.getCookie(httpRequest, jwtName);
        if(cookie == null){
            return null;
        }
        System.out.println(cookie);
        return cookie.getValue();
    }

    public ResponseCookie generateJWTCookie(UserDetailsImp userDetailsImp){
        Claims claims = Jwts.claims().setSubject(userDetailsImp.getEmail());
        claims.put("name", userDetailsImp.getUsername());
        String jwt = generateJWT(claims);
        return ResponseCookie.from(jwtName, jwt).path("/").maxAge(60*60*24*31).httpOnly(true).sameSite("Strict").secure(false).build();
    }

    public String generateJWT(Claims claims){
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String validateToken(String token){
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }

    public ResponseCookie getCleanJwtCookie(){
        return ResponseCookie.from(jwtName,  "").path("/").httpOnly(true).sameSite("Strict").secure(false).build();
    }
}
