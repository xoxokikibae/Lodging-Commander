package com.hotel.lodgingCommander.model;

import lombok.Data;

@Data
public class RoomResponseDTO {
    private Long id;
    private String roomName;
    private int maxPeople;
    private int oneDayPrice; // price
    private String detail;

    private String hotelName;
    private String imgPath;
}
