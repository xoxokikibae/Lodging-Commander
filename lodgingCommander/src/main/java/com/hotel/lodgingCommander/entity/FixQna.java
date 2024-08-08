package com.hotel.lodgingCommander.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Fix_QnA")
public class FixQna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 1000, nullable = false)
    private String content;

    @Column(name = "Upload_Date&Time", nullable = false)
    @CreatedDate
    private LocalDateTime qnaUploadDateTime;

    @Column(name = "Edit_Date&Time", nullable = false)
    @LastModifiedDate
    private LocalDateTime qnaEditDateTime;

    @Column(columnDefinition = "integer default 0")
    private int view;
}
