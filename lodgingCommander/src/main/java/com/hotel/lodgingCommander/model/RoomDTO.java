package com.hotel.lodgingCommander.model;

import lombok.Data;

@Data
public class RoomDTO {
    private Long id;
    private String name;
    private int price;
    private Long hotelId;
//    private Img img;
    private int quantity;
    private String detail;
//    private List<Cart> carts;
}
