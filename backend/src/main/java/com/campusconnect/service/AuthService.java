package com.campusconnect.service;

import com.campusconnect.dto.AuthDtos;
import com.campusconnect.model.Role;
import com.campusconnect.model.User;
import com.campusconnect.model.UserStatus;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    private static final String CAMPUS_EMAIL_DOMAIN = "@college.edu";

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public User register(AuthDtos.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }
        if (userRepository.existsByRollNumber(request.getRollNumber())) {
            throw new IllegalArgumentException("Roll number is already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRollNumber(request.getRollNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = request.getRole() != null ? request.getRole() : Role.STUDENT;
        user.setRole(role);

        if (request.getEmail().toLowerCase().endsWith(CAMPUS_EMAIL_DOMAIN)) {
            user.setStatus(UserStatus.ACTIVE);
        } else {
            user.setStatus(UserStatus.PENDING_APPROVAL);
        }

        return userRepository.save(user);
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

            String token = tokenProvider.generateToken(user.getEmail(), user.getRole());
            return new AuthDtos.AuthResponse(token, user.getRole().name(), user.getName());
        } catch (AuthenticationException ex) {
            throw new IllegalArgumentException("Invalid email or password");
        }
    }
}

