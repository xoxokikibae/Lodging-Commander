package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.dto.user.CustomUserDetails;
import com.hotel.lodgingCommander.dto.user.UserDTO;
import com.hotel.lodgingCommander.entity.User;
import com.hotel.lodgingCommander.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

/*    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new CustomUserDetails(user);
    }*/

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> byEmail = userRepository.findByEmail(email);
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(byEmail.get().getEmail());
        userDTO.setPassword(byEmail.get().getPassword());
        userDTO.setRole(byEmail.get().getRole());
        return new CustomUserDetails(userDTO);
    }
}