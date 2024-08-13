package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.BookingList;
import com.hotel.lodgingCommander.entity.Room;
import com.hotel.lodgingCommander.entity.User;
import com.hotel.lodgingCommander.model.BookingListRequestDTO;
import com.hotel.lodgingCommander.model.BookingListResponseDTO;
import com.hotel.lodgingCommander.repository.BookingListRepository;
import com.hotel.lodgingCommander.repository.RoomRepository;
import com.hotel.lodgingCommander.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingListRepository BOOKING_LIST_REPOSITORY;
    private final RoomRepository ROOM_REPOSITORY;
    private final UserRepository USER_REPOSITORY;

    private BookingListResponseDTO convertToDTO(BookingList entity) {
        BookingListResponseDTO resultDTO = new BookingListResponseDTO();
        resultDTO.setId(entity.getId());
        resultDTO.setCheckInDate(entity.getCheckInDate());
        resultDTO.setCheckOutDate(entity.getCheckOutDate());
        resultDTO.setTotalPrice(entity.getTotalPrice());
        resultDTO.setTotalPeople(entity.getTotalPeople());
        resultDTO.setCancel(entity.getCancel());
        // join value
        resultDTO.setHotelName(entity.getRoom().getHotel().getName());
        resultDTO.setRoomName(entity.getRoom().getName());
        resultDTO.setRoomPrice(entity.getRoom().getPrice());
        resultDTO.setImgPath(entity.getRoom().getImg().getPath());
        return resultDTO;
    }

    private List<BookingList> getAllUserBooking(Long userId) {
        return BOOKING_LIST_REPOSITORY.findByUserId(userId);
    }

    private boolean isCheckOutDateValid(LocalDate checkOutDate) {
        LocalDate currentDate = LocalDate.now();
        return !checkOutDate.isBefore(currentDate);
    }

    // ----------------------------------------------------------------------------------------------------

    @Transactional
    public void createBooking(BookingListRequestDTO requestDTO) {
        User user = USER_REPOSITORY.findById(requestDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));
        Room room = ROOM_REPOSITORY.findById(requestDTO.getRoomId())
                .orElseThrow(() -> new EntityNotFoundException("Room Not Found"));

        BookingList bookingListEntity = BookingList.builder()
                .user(user)
                .room(room)
                .checkInDate(requestDTO.getCheckInDate())
                .checkOutDate(requestDTO.getCheckOutDate())
                .totalPeople(requestDTO.getTotalPeople())
                .totalPrice(requestDTO.getTotalPrice())
                .cancel(false)
                .build();
        BOOKING_LIST_REPOSITORY.save(bookingListEntity);
    }

    // selectAllValidBooking | Table: booking_list | checkInDate is Not expired && cancel is false
    @Transactional(readOnly = true)
    public Map<String, Object> myAllValidBooking(Long userId) {
        List<BookingListResponseDTO> responseDTO = getAllUserBooking(userId).stream()
                .filter(booking -> isCheckOutDateValid(booking.getCheckOutDate()) && !booking.getCancel())
                .map(this::convertToDTO)
                .toList();
        return Map.of("bookingList", responseDTO);
    }

    // selectExpiredBooking | Table: booking_list | checkInDate is expired
    @Transactional(readOnly = true)
    public Map<String, Object> myAllExpiredBooking(Long userId) {
        List<BookingListResponseDTO> responseDTO = getAllUserBooking(userId).stream()
                .filter(booking -> !isCheckOutDateValid(booking.getCheckOutDate()) && !booking.getCancel())
                .map(this::convertToDTO)
                .toList();
        return Map.of("bookingList", responseDTO);
    }

    // selectCancelBooking | Table: booking_list | cancel is true
    @Transactional(readOnly = true)
    public Map<String, Object> myAllCancelBooking(Long userId) {
        List<BookingListResponseDTO> responseDTO = getAllUserBooking(userId).stream()
                .filter(BookingList::getCancel)
                .map(this::convertToDTO)
                .toList();
        return Map.of("bookingList", responseDTO);
    }

}
