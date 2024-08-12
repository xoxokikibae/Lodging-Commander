package com.hotel.lodgingCommander.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
@Table(name = "Booking_QnA_Comment")
public class BookingQnaComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String bookingQnaComment;

    @Column(name = "comment_date_time", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime uploadDateTime;

    @Column(name = "comment_edit_date_time", nullable = false)
    @LastModifiedDate
    private LocalDateTime editDateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference
    private BookingQnaPost bookingQnaPosts;
}
