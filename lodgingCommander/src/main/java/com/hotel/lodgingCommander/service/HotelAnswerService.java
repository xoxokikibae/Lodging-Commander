package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.HotelAnswer;
import com.hotel.lodgingCommander.entity.HotelQuestion;
import com.hotel.lodgingCommander.exception.ResourceNotFoundException;
import com.hotel.lodgingCommander.repository.HotelAnswerRepository;
import com.hotel.lodgingCommander.repository.HotelQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HotelAnswerService {
    @Autowired
    private HotelAnswerRepository hotelAnswerRepository;

    @Autowired
    private HotelQuestionRepository hotelQuestionRepository;

    public HotelAnswer addHotelAnswer(Long hotelQuestionId, HotelAnswer hotelAnswer) {
        HotelQuestion hotelQuestion = hotelQuestionRepository.findById(hotelQuestionId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel Question not found"));

        hotelAnswer.setHotelQuestion(hotelQuestion);
        hotelAnswer.setUploadDateTime(LocalDateTime.now());

        hotelQuestion.setAnswered(true);
        hotelQuestionRepository.save(hotelQuestion);

        return hotelAnswerRepository.save(hotelAnswer);
    }
}

