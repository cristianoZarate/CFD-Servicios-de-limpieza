package com.cfd.cfd.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        
        // Convertimos la URI a minúsculas para evitar problemas de descalce
        final String requestURI = request.getRequestURI().toLowerCase();

  
        // Se elimina "usuarios" de esta lista para obligar la validación de tokens en la gestión de clientes
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ") || 
            requestURI.contains("auth") || 
            requestURI.contains("servicios") || 
            requestURI.contains("reservas") || 
            requestURI.contains("disponibilidad")) {
            
  
            chain.doFilter(request, response); 
            return; 
        }

        String username = null;
        String jwt = null;

        // Procesa y valida el token JWT entrante si la ruta está protegida
        jwt = authorizationHeader.substring(7);
        try {
            username = jwtUtil.extractUsername(jwt);
        } catch (Exception e) {
            logger.warn("No se pudo extraer o decodificar el nombre de usuario desde el token JWT enviado.");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        chain.doFilter(request, response);
    }
}