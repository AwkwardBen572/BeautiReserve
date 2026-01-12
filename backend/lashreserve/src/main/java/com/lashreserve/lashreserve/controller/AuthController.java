package com.lashreserve.lashreserve.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lashreserve.lashreserve.dto.RegisterRequest;
import com.lashreserve.lashreserve.entity.User;
import com.lashreserve.lashreserve.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.email)) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already in use");
        }

        User user = new User();
        user.setFullName(request.fullName);
        user.setPhoneNumber(request.phoneNumber);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}
