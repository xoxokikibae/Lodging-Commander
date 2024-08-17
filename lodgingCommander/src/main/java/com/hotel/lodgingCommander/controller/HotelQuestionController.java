package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.entity.HotelQuestion;
import com.hotel.lodgingCommander.service.HotelQuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hotels/{hotelId}/questions")
public class HotelQuestionController {

    private HotelQuestionService hotelQuestionService;

    @GetMapping
    public Page<HotelQuestion> getHotelQuestion(
            @PathVariable Long hotelId,
            @RequestParam boolean isAnswered,
            Pageable pageable) {
        return hotelQuestionService.getQuestionsByHotelIdAndStatus(hotelId, isAnswered, pageable);
    }

    @PostMapping
    public HotelQuestion addHotelQuestion(@PathVariable Long hotelId, @RequestBody HotelQuestion hotelQuestion) {
        return hotelQuestionService.addQuestion(hotelId,hotelQuestion);
    }
}
