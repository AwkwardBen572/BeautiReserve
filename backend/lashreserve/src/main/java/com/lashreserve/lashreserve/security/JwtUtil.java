package com.lashreserve.lashreserve.security;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final String SECRET = "hello_there_i_amyourdaddy_yddadrouyma_i_ereht_olleh_572725901874950";
    private final Key key;

    private final long EXPIRATION = 1000 * 60 * 60 * 24;

    public JwtUtil() {
        byte[] hmacKey = Base64.getEncoder().encode(SECRET.getBytes());
        key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key).build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
