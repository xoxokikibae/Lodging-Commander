package com.hotel.lodgingCommander.repository;

import com.hotel.lodgingCommander.entity.HotelQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface HotelQuestionRepository extends JpaRepository<HotelQuestion, Long> {
    Page<HotelQuestion> findByHotelIdAndIsAnswered(Long HotelId, Boolean IsAnswered, Pageable pageable);
    Page<HotelQuestion> findByHotelIdAndUserId(Long hotelId, Long userId, Pageable pageable);
    Page<HotelQuestion> findByHotelId(Long HotelId, Pageable pageable);
}
