package com.lashreserve.lashreserve.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lashreserve.lashreserve.entity.Bookings;
import com.lashreserve.lashreserve.repository.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/user/{userId}")
    public List<Bookings> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @GetMapping("/user/{userId}/latest")
    public ResponseEntity<Bookings> getLatestBooking(@PathVariable Long userId) {
        return bookingRepository.findFirstByUserIdOrderByBookingDateDesc(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}
