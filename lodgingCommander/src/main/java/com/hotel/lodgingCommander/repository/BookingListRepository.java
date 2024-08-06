package com.hotel.lodgingCommander.repository;

import com.hotel.lodgingCommander.entity.BookingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingListRepository extends JpaRepository<BookingList, Long> {}



