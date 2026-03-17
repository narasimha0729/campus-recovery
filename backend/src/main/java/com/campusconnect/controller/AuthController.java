package com.campusconnect.controller;

import com.campusconnect.dto.AuthDtos;
import com.campusconnect.model.User;
import com.campusconnect.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthDtos.RegisterRequest request) {
        User user = authService.register(request);
        String message;
        switch (user.getStatus()) {
            case ACTIVE -> message = "Registration successful. Your account is active.";
            case PENDING_APPROVAL ->
                    message = "Registration successful. Awaiting admin approval due to non-campus email.";
            case REJECTED -> message = "Your account has been rejected.";
            default -> message = "Registration completed.";
        }
        return ResponseEntity.ok(message);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDtos.AuthResponse> login(@Valid @RequestBody AuthDtos.LoginRequest request) {
        AuthDtos.AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}

