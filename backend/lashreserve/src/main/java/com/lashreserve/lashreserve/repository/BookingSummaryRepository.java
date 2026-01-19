package com.lashreserve.lashreserve.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lashreserve.lashreserve.entity.UserBookings;

public interface BookingSummaryRepository extends JpaRepository<UserBookings, Long> {
    List<UserBookings> findByUserId(Long userId);
}