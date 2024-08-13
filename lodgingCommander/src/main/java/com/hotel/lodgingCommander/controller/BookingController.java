package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.model.BookingListRequestDTO;
import com.hotel.lodgingCommander.model.RoomResponseDTO;
import com.hotel.lodgingCommander.service.BookingService;
import com.hotel.lodgingCommander.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class BookingController {
    private final BookingService BOOKING_SERVICE;
    private final RoomService ROOM_SERVICE;

    public Long userId = 1L; // test value

    @RequestMapping("/booking/{id}")
    public ResponseEntity<RoomResponseDTO> responseBooking(@PathVariable("id") Long roomId) {
        return ResponseEntity.ok(ROOM_SERVICE.selectOneRoom(roomId));
    }

    @PostMapping("/booking/{id}")
    public void requestBooking(@PathVariable Long id, @RequestBody BookingListRequestDTO requestDTO) {
        try {
            BOOKING_SERVICE.createBooking(requestDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/validBooking")
    public ResponseEntity<Map<String, Object>> validBooking() {
        return ResponseEntity.ok(BOOKING_SERVICE.myAllValidBooking(userId));
    }

    @RequestMapping("/expiredBooking")
    public ResponseEntity<Map<String, Object>> expiredBooking() {
        return ResponseEntity.ok(BOOKING_SERVICE.myAllExpiredBooking(userId));
    }

    @RequestMapping("/cancelBooking")
    public ResponseEntity<Map<String, Object>> cancelBooking() {
        return ResponseEntity.ok(BOOKING_SERVICE.myAllCancelBooking(userId));
    }

}
