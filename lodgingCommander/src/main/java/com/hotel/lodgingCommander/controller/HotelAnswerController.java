package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.entity.HotelAnswer;
import com.hotel.lodgingCommander.service.HotelAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hotels/{hotelId}/Answers")

public class HotelAnswerController {
    @Autowired
    private HotelAnswerService hotelAnswerService;

    @PostMapping
    public HotelAnswer addHotelAnswer(@PathVariable Long hotelQuestionId, @RequestBody HotelAnswer hotelAnswer) {
    return hotelAnswerService.addHotelAnswer(hotelQuestionId, hotelAnswer);
    }
}
