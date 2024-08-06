package com.hotel.lodgingCommander.model;

import com.hotel.lodgingCommander.entity.BookingList;
import com.hotel.lodgingCommander.entity.Room;
import com.hotel.lodgingCommander.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class BookingListDTO {
    private long id;
    private User userId;
    private Room roomId;
    private boolean checkIn;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int totalPrice;
    private int totalPeople;

    // 화요일에 DTO 파일로 필터링 할지, 메서드로 필터링 할지 정하기
    public static BookingListDTO toDTO(BookingList entity) {
        return BookingListDTO.builder()
                .id(entity.getId())
                .userId(entity.getUser())
                .roomId(entity.getRoom())
                .checkIn(entity.getCheckIn())
                .checkInDate(entity.getCheckInDate())
                .checkOutDate(entity.getCheckOutDate())
                .totalPrice(entity.getTotalPrice())
                .totalPeople(entity.getTotalPeople())
                .build();
    }
}
