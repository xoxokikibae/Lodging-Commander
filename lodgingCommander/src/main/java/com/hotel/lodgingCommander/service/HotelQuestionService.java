package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.Hotel;
import com.hotel.lodgingCommander.entity.HotelQuestion;
import com.hotel.lodgingCommander.exception.ResourceNotFoundException;
import com.hotel.lodgingCommander.repository.HotelQuestionRepository;
import com.hotel.lodgingCommander.repository.HotelRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HotelQuestionService {
    private final HotelQuestionRepository hotelQuestionRepository;
    private final HotelRepository hotelRepository;

    public HotelQuestionService(HotelQuestionRepository hotelQuestionRepository, HotelRepository hotelRepository) {
        this.hotelQuestionRepository = hotelQuestionRepository;
        this.hotelRepository = hotelRepository;
    }

    public Page<HotelQuestion> getQuestions(Long hotelId, Long userId, Boolean isAnswered, Pageable pageable) {
        if (userId != null) {
            return hotelQuestionRepository.findByHotelIdAndUserId(hotelId, userId, pageable);
        } else if (isAnswered != null) {
            return hotelQuestionRepository.findByHotelIdAndIsAnswered(hotelId, isAnswered, pageable);
        } else {
            return hotelQuestionRepository.findByHotelId(hotelId, pageable);
        }
    }

    public HotelQuestion addQuestion(Long hotelId, HotelQuestion hotelQuestion) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id " + hotelId));
        hotelQuestion.setHotel(hotel);
        hotelQuestion.setUploadDateTime(LocalDateTime.now());
        return hotelQuestionRepository.save(hotelQuestion);
    }
}