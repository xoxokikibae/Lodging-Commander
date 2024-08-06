package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class RoomController {

    private final RoomService ROOM_SERVICE;

    // print room map json
    @GetMapping("roomList")
    public ResponseEntity<HashMap<String,Object>> roomList() {
        return ResponseEntity.ok(ROOM_SERVICE.selectAllRoom());
    }

}
