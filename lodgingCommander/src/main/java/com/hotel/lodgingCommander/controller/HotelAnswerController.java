package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.entity.HotelAnswer;
import com.hotel.lodgingCommander.service.HotelAnswerService;
import com.hotel.lodgingCommander.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hotels/{hotelId}/Answers")

public class HotelAnswerController {

    private final HotelAnswerService hotelAnswerService;

    private HotelAnswerController(HotelAnswerService hotelAnswerService) {
        this.hotelAnswerService = hotelAnswerService;
    }

    @PostMapping
    public ResponseEntity <HotelAnswer> addHotelAnswer(
            @PathVariable Long hotelId,
            @PathVariable Long questionId,
            @PathVariable HotelAnswer hotelAnswer) {
        HotelAnswer savedAnswer = hotelAnswerService.addHotelAnswer(questionId, hotelAnswer);
    return new ResponseEntity<>(savedAnswer, HttpStatus.CREATED);
    }
}
