package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.entity.HotelQuestion;
import com.hotel.lodgingCommander.service.HotelQuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class HotelQuestionController {

    private final HotelQuestionService hotelQuestionService;

    public HotelQuestionController(HotelQuestionService hotelQuestionService) {
        this.hotelQuestionService = hotelQuestionService;
    }

    @GetMapping
    public ResponseEntity<Page<HotelQuestion>> getHotelQuestions(
            @PathVariable Long hotelId,
            @RequestParam(required = false) Boolean isAnswered,
            @RequestParam(required = false) Long userId,
            Pageable pageable) {
        Page<HotelQuestion> questions = hotelQuestionService.getQuestions(hotelId, userId, isAnswered, pageable);
        if (questions.hasContent()) {
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping
    public ResponseEntity<HotelQuestion> addHotelQuestion(
            @PathVariable Long hotelId,
            @RequestBody HotelQuestion hotelQuestion) {
        HotelQuestion createdQuestion = hotelQuestionService.addQuestion(hotelId, hotelQuestion);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }
}