package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.Room;
import com.hotel.lodgingCommander.model.RoomResponseDTO;
import com.hotel.lodgingCommander.repository.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository ROOMS_REPOSITORY;

    // convert entity to dto
    private RoomResponseDTO convertToDTO(Room entity) {
        RoomResponseDTO resultDTO = new RoomResponseDTO();
        resultDTO.setId(entity.getId());
        resultDTO.setHotelName(entity.getHotel().getName());
        resultDTO.setRoomName(entity.getName());
        resultDTO.setOneDayPrice(entity.getPrice());
        resultDTO.setDetail(entity.getDetail());
        resultDTO.setMaxPeople(entity.getMaxPeople());
        resultDTO.setImgPath(entity.getImg().getPath());
        return resultDTO;
    }

    // ----------------------------------------------------------------------------------------------------

    // select all room
    @Transactional(readOnly = true)
    public Map<String, Object> selectAllRoom() {
        List<Room> room = ROOMS_REPOSITORY.findAll();
        List<RoomResponseDTO> roomDTO = room.stream()
                .map(this::convertToDTO)
                .toList();
        return Map.of("roomList", roomDTO);
    }

    // select one room
    @Transactional(readOnly = true)
    public RoomResponseDTO selectOneRoom(Long id) {
        Room room = ROOMS_REPOSITORY.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found"));
        return convertToDTO(room);
    }

}
