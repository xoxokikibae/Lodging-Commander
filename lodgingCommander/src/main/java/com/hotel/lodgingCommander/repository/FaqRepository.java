package com.hotel.lodgingCommander.repository;

import com.hotel.lodgingCommander.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findByTitleContaining(String keyword);
    List<Faq> findByContentContaining(String keyword);
    List<Faq> findAllByOrderByIdAsc();
}