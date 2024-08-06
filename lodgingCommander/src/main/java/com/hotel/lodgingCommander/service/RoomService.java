package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.Room;
import com.hotel.lodgingCommander.model.RoomDTO;
import com.hotel.lodgingCommander.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository ROOMS_REPOSITORY;

    // selectAll where room all table
    public HashMap<String, Object> selectAllRoom() {
        List<Room> room = ROOMS_REPOSITORY.findAll();
        List<RoomDTO> roomDTOs = room.stream()
                .map(RoomDTO::toDTO)
                .collect(Collectors.toList());

        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("roomList", roomDTOs);

        return resultMap;
    }

}
