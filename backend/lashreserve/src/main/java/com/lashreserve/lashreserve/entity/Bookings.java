package com.lashreserve.lashreserve.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

public class Bookings {
    @Entity
    @Table(name = "bookings")
    public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "user_id")
        private String userId;

        @Column(name = "booking_date")
        private String bookingDate;

        @Column(name = "booking_date_confirmed")
        private String bookingDateConfirmed;

        @Column(name = "deposit_paid")
        private String depositPaid;

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

        public String getBookingDate() {
            return bookingDate;
        }

        public void setBookingDate(String bookingDate) {
            this.bookingDate = bookingDate;
        }

        public String getBookingDateConfirmed() {
            return bookingDateConfirmed;
        }

        public void setBookingDateConfirmed(String bookingDateConfirmed) {
            this.bookingDateConfirmed = bookingDateConfirmed;
        }

        public String getDepositPaid() {
            return depositPaid;
        }

        public void setDepositPaid(String depositPaid) {
            this.depositPaid = depositPaid;
        }
    }
}