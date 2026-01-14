package com.lashreserve.lashreserve.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lashreserve.lashreserve.entity.PasswordResetToken;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);
}