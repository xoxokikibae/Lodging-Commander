package com.hotel.lodgingCommander.dto.hotel;

import lombok.Data;

import java.util.Date;

@Data
public class HotelAnswerDTO {
    private Long id;
    private Long hotelId;
    private Long userId;
    private Long questionId;

    private String responderName;

    private String answerContent;
    private Date answerDate;
    private int helpfulVotes;

    private boolean isOfficial;
}
