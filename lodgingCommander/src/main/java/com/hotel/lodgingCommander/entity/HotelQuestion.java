package com.hotel.lodgingCommander.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "hotelQuestion")
public class HotelQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    @JsonBackReference
    private Hotel hotel;

    @Column(length = 100, nullable = false)
    private String title;

    @Lob
    private String content;

    @Column(name = "upload_date_time", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime uploadDateTime;

    @Column(name = "edit_date_time", nullable = false)
    @LastModifiedDate
    private LocalDateTime editDateTime;

    @Column(columnDefinition = "integer default 0")
    private int viewCount;

    @OneToMany(mappedBy = "hotelQuestion", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @OrderBy("id asc")
    @JsonManagedReference
    private List<HotelAnswer> hotelAnswers;

    @Column(name="isAnswered", nullable = false)
    private boolean isAnswered;

    public boolean isAnswered() {
        return isAnswered;
    }

    public void setAnswered(boolean answered) {
        isAnswered = answered;
    }
}