package com.lashreserve.lashreserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lashreserve.lashreserve.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    User findByEmail(String username);
}
