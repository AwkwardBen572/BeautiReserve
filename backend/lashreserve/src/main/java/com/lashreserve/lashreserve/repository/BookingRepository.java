package com.lashreserve.lashreserve.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lashreserve.lashreserve.entity.Bookings;

public interface BookingRepository extends JpaRepository<Bookings, Long> {
    List<Bookings> findByUserId(Long userId);

    Optional<Bookings> findFirstByUserIdOrderByBookingDateDesc(Long userId);
}
