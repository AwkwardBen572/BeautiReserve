package com.lashreserve.lashreserve.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookings")
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "booking_created", nullable = false, updatable = false)
    private Instant bookingCreated;

    @Column(name = "booking_date", nullable = false, updatable = true)
    private Instant bookingDate;

    @Column(name = "booking_status")
    private String bookingStatus;

    @PrePersist
    protected void onCreate() {
        this.bookingCreated = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Instant getBookingCreated() {
        return bookingCreated;
    }

    public void setBookingCreated(Instant bookingCreated) {
        this.bookingCreated = bookingCreated;
    }

    public Instant getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Instant bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
}