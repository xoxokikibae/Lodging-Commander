package com.hotel.lodgingCommander.model;

import com.hotel.lodgingCommander.entity.Cart;
import com.hotel.lodgingCommander.entity.Hotel;
import com.hotel.lodgingCommander.entity.Img;
import com.hotel.lodgingCommander.entity.Room;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomDTO {
    private Long id;
    private String name;
    private int price;
    private Hotel hotel;
    private Img img;
    private int quantity;
    private String detail;
    private List<Cart> carts;

    // 화요일에 DTO 파일로 필터링 할지, 메서드로 필터링 할지 정하기
    public static RoomDTO toDTO(Room entity) {
        return RoomDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .price(entity.getPrice())
                .img(entity.getImg())
                .hotel(entity.getHotel())
                .quantity(entity.getQuantity())
                .detail(entity.getDetail())
                .carts(entity.getCarts())
                .build();
    }
}
