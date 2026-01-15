package com.lashreserve.lashreserve.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lashreserve.lashreserve.entity.PasswordResetToken;
import com.lashreserve.lashreserve.entity.User;
import com.lashreserve.lashreserve.repository.PasswordResetTokenRepository;
import com.lashreserve.lashreserve.repository.UserRepository;

@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(
            UserRepository userRepository,
            PasswordResetTokenRepository tokenRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<String> createResetToken(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            PasswordResetToken existingToken = tokenRepository.findByUser(user).orElse(null);

            if (existingToken != null) {
                tokenRepository.delete(existingToken);
            }

            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user);
            resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(10));

            tokenRepository.save(resetToken);

            // send email with token link
            // Example: https://yourdomain.com/reset-password?token=XYZ
        }

        return ResponseEntity.ok("If this email exists, a reset link has been sent.");
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        System.out.println(newPassword);
        User user = resetToken.getUser();
        System.out.println(user.getEmail());

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(resetToken);
    }
}