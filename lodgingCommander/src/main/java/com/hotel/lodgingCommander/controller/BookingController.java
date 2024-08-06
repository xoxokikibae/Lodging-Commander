package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.model.BookingListDTO;
import com.hotel.lodgingCommander.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/booking/")
public class BookingController {
    private final BookingService BOOKING_SERVICE;

    // - Axios 예약 폼 POST 데이터 받기 -
    // Axios 가 POST 요청을 받으면 @RestController 를 통해 비동기 HTTP 처리가 발생합니다.
    // JSON 타입의 데이터를 자동 처리하게 됩니다.
    @PostMapping("insertBooking")
    public HashMap<String, Object> insertBooking(@RequestBody BookingListDTO bookingListDTO) {
        HashMap<String, Object> resultMap = new HashMap<>();
        try {
            BOOKING_SERVICE.insertBooking(bookingListDTO);
            resultMap.put("result:", "success");
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("result:", "fail");
        }
        return resultMap;
    }

}
