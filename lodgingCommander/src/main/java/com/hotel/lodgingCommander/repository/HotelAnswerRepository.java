package com.hotel.lodgingCommander.repository;

import com.hotel.lodgingCommander.entity.HotelAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelAnswerRepository extends JpaRepository<HotelAnswer, Long> {
    List<HotelAnswer> findByHotelQuestionId(Long id);
}
