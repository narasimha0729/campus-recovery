package com.campusconnect.controller;

import com.campusconnect.model.User;
import com.campusconnect.model.UserStatus;
import com.campusconnect.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    public static class ApproveUserRequest {
        @NotNull
        private Long userId;

        @NotNull
        private UserStatus status;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public UserStatus getStatus() {
            return status;
        }

        public void setStatus(UserStatus status) {
            this.status = status;
        }
    }

    @PutMapping("/approve-user")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> approveUser(@RequestBody ApproveUserRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setStatus(request.getStatus());
        return ResponseEntity.ok(userRepository.save(user));
    }
}

