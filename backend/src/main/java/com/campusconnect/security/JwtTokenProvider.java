package com.campusconnect.security;

import com.campusconnect.model.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;
    private final long expirationInMs;

    public JwtTokenProvider(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.expiration-ms}") long expirationInMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationInMs = expirationInMs;
    }

    public String generateToken(String username, Role role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationInMs);

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role.name())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }

    public String getRoleFromJWT(String token) {
        Claims claims = parseClaims(token);
        Object role = claims.get("role");
        return role != null ? role.toString() : null;
    }

    public boolean validateToken(String authToken) {
        try {
            parseClaims(authToken);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

