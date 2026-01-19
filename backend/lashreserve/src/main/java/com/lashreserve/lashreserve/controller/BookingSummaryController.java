package com.lashreserve.lashreserve.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lashreserve.lashreserve.entity.UserBookings;
import com.lashreserve.lashreserve.repository.BookingSummaryRepository;

@RestController
@RequestMapping("/api/booking_summary")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BookingSummaryController {

    private final BookingSummaryRepository bookingSummaryRepository;

    public BookingSummaryController(BookingSummaryRepository bookingSummaryRepository) {
        this.bookingSummaryRepository = bookingSummaryRepository;
    }

    @GetMapping("/summary/{userId}")
    public List<UserBookings> getBookingsByUser(@PathVariable Long userId) {
        return bookingSummaryRepository.findByUserId(userId);
    }
}