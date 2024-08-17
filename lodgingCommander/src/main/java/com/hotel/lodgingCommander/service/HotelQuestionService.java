package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.Hotel;
import com.hotel.lodgingCommander.entity.HotelQuestion;
import com.hotel.lodgingCommander.exception.ResourceNotFoundException;
import com.hotel.lodgingCommander.repository.HotelQuestionRepository;
import com.hotel.lodgingCommander.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HotelQuestionService {
    private HotelQuestionRepository hotelQuestionRepository;

    private HotelRepository hotelRepository;

    public Page<HotelQuestion> getQuestionsByHotelIdAndStatus(Long hotelId, boolean isAnswered, Pageable pageable) {
        return hotelQuestionRepository.findByHotelIdAndIsAnswered(hotelId, isAnswered, pageable);
    }

    public HotelQuestion addQuestion(Long hotelId, HotelQuestion hotelQuestion) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id " + hotelId));
        hotelQuestion.setHotel(hotel);
        hotelQuestion.setUploadDateTime(LocalDateTime.now());
        return hotelQuestionRepository.save(hotelQuestion);
    }
}
