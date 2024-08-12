package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.dto.*;
import com.hotel.lodgingCommander.entity.User;
import com.hotel.lodgingCommander.service.AddHotelService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/properties")
public class AddHotelController {

    private User getTemporaryUser() {
        User user = new User();
        user.setId(1L);

        return user;
    }


    private final AddHotelService addHotelService;

    public AddHotelController(AddHotelService addHotelService) {
        this.addHotelService = addHotelService;
    }


    @PostMapping("/address")
    public ResponseEntity<Map<String, Long>> saveAddress(@RequestBody AddressDTO addressDTO, HttpSession session) {
        Long addressId = addHotelService.saveAddress(addressDTO);
        session.setAttribute("addressId", addressId);

        Map<String, Long> response = new HashMap<>();
        response.put("addressId", addressId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/category")
    public ResponseEntity<Map<String, Long>> saveCategory(@RequestBody CategoryDTO categoryDTO, HttpSession session) {
        Long categoryId = addHotelService.saveCategory(categoryDTO);
        Long addressId = (Long) session.getAttribute("addressId");
        session.setAttribute("categoryId", categoryId);

        Map<String, Long> response = new HashMap<>();
        response.put("categoryId", categoryId);
        response.put("addressId", addressId);

        return ResponseEntity.ok(response);
    }


    @PostMapping("/hotel")
    public ResponseEntity<Map<String, Long>> saveHotel(@RequestBody HotelDTO hotelDTO, HttpSession session) {
        Long hotelId = addHotelService.saveHotel(hotelDTO, getTemporaryUser());
        session.setAttribute("hotelId", hotelId);

        Map<String, Long> response = new HashMap<>();
        response.put("hotelId", hotelId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/facility")
    public ResponseEntity<Map<String, Long>> saveFacility(@RequestParam("hotelId") Long hotelId, @RequestBody FacilityDTO facilityDTO) {
        if (hotelId == null) {
            return ResponseEntity.badRequest().build();
        }

        facilityDTO.setHotelId(hotelId);
        addHotelService.saveFacility(facilityDTO);

        Map<String, Long> response = new HashMap<>();
        response.put("hotelId", hotelId);

        return ResponseEntity.ok(response);
    }




    @PostMapping("/room")
    public ResponseEntity<Map<String, Long>> saveRoom(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("detail") String detail,
            @RequestParam("maxPeople") int maxPeople,
            @RequestParam("hotelId") Long hotelId,
            @RequestParam(value = "imgId", required = false) Long imgId) {

        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setName(name);
        roomDTO.setPrice(price);
        roomDTO.setDetail(detail);
        roomDTO.setMaxPeople(maxPeople);
        roomDTO.setHotelId(hotelId);
        roomDTO.setQuantity(1);

        if (imgId != null) {
            roomDTO.setImgId(imgId);
        }


        addHotelService.saveRoom(roomDTO);
        Map<String, Long> response = new HashMap<>();
        response.put("roomId", roomDTO.getId());

        return ResponseEntity.ok(response);
    }


    @PostMapping("/uploadImage")
    public ResponseEntity<Map<String, Long>> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            Long imgId = addHotelService.saveImage(image);
            Map<String, Long> response = new HashMap<>();
            response.put("imgId", imgId);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
