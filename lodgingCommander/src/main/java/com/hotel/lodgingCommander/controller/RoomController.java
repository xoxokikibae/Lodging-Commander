package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class RoomController {

    private final RoomService ROOM_SERVICE;

    @GetMapping("roomList")
    public ResponseEntity<Map<String, Object>> roomList() {
        return ResponseEntity.ok(ROOM_SERVICE.selectAllRoom());
    }

}
