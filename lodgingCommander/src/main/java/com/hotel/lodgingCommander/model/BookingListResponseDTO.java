package com.hotel.lodgingCommander.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingListResponseDTO {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int totalPrice;
    private int totalPeople;
    private boolean cancel;

    // join value
    private String hotelName;
    private String roomName;
    private int roomPrice;
    private String imgPath;
}
