package com.hotel.lodgingCommander.model;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String grade;
    private String password;
    private String role;
    private String tel;
}
