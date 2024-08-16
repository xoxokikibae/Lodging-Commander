package com.hotel.lodgingCommander.dto.hotel;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class HotelQuestionDTO {
    private Long id;
    private Long hotelId;
    private Long userId;
    private String userNickname;

    private String title;
    private String content;

    private Date questionUploadDate;
    private Date questionEditDate;

    private List<HotelAnswerDTO> answers;
    private boolean isAnswered;

    private boolean isPublic;
}
