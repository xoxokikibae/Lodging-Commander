//package com.hotel.lodgingCommander.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public CorsFilter corsFilter() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowCredentials(true);
//        configuration.addAllowedOrigin("http://localhost:3000");
//
//        // * 은 위험하므로 이후 구체적인 헤더 목록 지정할 것
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("GET, POST, PUT, DELETE");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//
//        return new CorsFilter(source);
//    }
//}
