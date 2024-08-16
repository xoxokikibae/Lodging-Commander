package com.hotel.lodgingCommander.repository;

import com.hotel.lodgingCommander.entity.HotelQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface HotelQuestionRepository extends JpaRepository<HotelQuestion, Long> {
    Page<HotelQuestion> findByHotelIdAndIsAnswered(Long HotelId, boolean IsAnswered, Pageable pageable);
}
