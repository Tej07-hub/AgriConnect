package com.agriconnect.security;

import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

import org.springframework.beans.factory.annotation.Value;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private long expiration;
	
	private SecretKey getSigningKey() {
	    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	}

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }
    
    public String extractUsername(String token) {

        Jws<Claims> claims = Jwts.parserBuilder()
        		.setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);

        return claims.getBody().getSubject();
    }
    
    public Date extractExpiration(String token) {

        Jws<Claims> claims = Jwts.parserBuilder()
        		.setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);

        return claims.getBody().getExpiration();
    }
    
    public boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }
    
    public boolean validateToken(String token, String email) {

        String username = extractUsername(token);

        return username.equals(email) && !isTokenExpired(token);
    }
}