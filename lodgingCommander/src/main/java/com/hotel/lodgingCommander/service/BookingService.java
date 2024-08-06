package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.BookingList;
import com.hotel.lodgingCommander.model.BookingListDTO;
import com.hotel.lodgingCommander.repository.BookingListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingListRepository BOOKING_LIST_REPOSITORY;

    // method - insert where booking_list table (Auto ID)
    // // form 값(DTO)을 entity 화 하여 DB에 "save" 합니다.
    public void insertBooking(BookingListDTO bookingListDTO) {
        BookingList bookingList = BookingList.builder()
                .user(bookingListDTO.getUserId())
                .room(bookingListDTO.getRoomId())
                .checkInDate(bookingListDTO.getCheckInDate())
                .checkOutDate(bookingListDTO.getCheckOutDate())
                .totalPeople(bookingListDTO.getTotalPeople())
                .totalPrice(bookingListDTO.getTotalPrice())
                .checkIn(false) // origin booking checkIn value is false
                .build();
        BOOKING_LIST_REPOSITORY.save(bookingList);

    }

    // method - selectOne where booking_list id table

    // method - selectAll where booking_list all table

    // method - selectValidBooking where booking_list checkIn = false

    // method - selectExpiredBooking where booking_list checkIn = true

    // method - selectCancelBooking where booking_list cancel = true

}
