package com.lashreserve.lashreserve.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lashreserve.lashreserve.dto.ForgotPasswordRequest;
import com.lashreserve.lashreserve.dto.RegisterRequest;
import com.lashreserve.lashreserve.dto.ResetPasswordRequest;
import com.lashreserve.lashreserve.entity.User;
import com.lashreserve.lashreserve.repository.UserRepository;
import com.lashreserve.lashreserve.security.JwtUtil;
import com.lashreserve.lashreserve.service.PasswordResetService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final PasswordResetService passwordResetService;

    public AuthController(UserRepository userRepository,
            PasswordEncoder passwordEncoder, JwtUtil jwtUtil, PasswordResetService passwordResetService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.email)) {
            throw new RuntimeException("Unable to register");
        }

        User user = new User();
        user.setFullName(request.fullName);
        user.setPhoneNumber(request.phoneNumber);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RegisterRequest request,
            HttpServletResponse response) {

        User user = userRepository.findByEmail(request.email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user == null ||
                !passwordEncoder.matches(request.password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);

        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        passwordResetService.createResetToken(request.getEmail());
        return ResponseEntity.ok("Reset email sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        passwordResetService.resetPassword(
                request.getToken(),
                request.getNewPassword());
        return ResponseEntity.ok("Password updated");
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        return request.getUserPrincipal() != null
                ? ResponseEntity.ok().build()
                : ResponseEntity.status(401).build();
    }
}
