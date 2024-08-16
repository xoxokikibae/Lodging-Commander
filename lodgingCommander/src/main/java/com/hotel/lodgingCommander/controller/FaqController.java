package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.entity.Faq;
import com.hotel.lodgingCommander.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/faqBoard")
public class FaqController {

    private final FaqService faqService;

    @Autowired
    public FaqController(FaqService faqService) {
        this.faqService = faqService;
    }

    @GetMapping("/faqAdmin/listFaqs")
    public ResponseEntity<List<Faq>> getAllFaqs() {
        List<Faq> faqs = faqService.getAllFaqs();
        return new ResponseEntity<>(faqs, HttpStatus.OK);
    }

    @GetMapping("/faqAdmin/faqs/{id}")
    public ResponseEntity<?> getFaqById(@PathVariable Long id) {
        Faq faq = faqService.getFaqById(id);
        return new ResponseEntity<>(faq, HttpStatus.OK);
    }

    @PostMapping("/faqAdmin/upload/{id}")
    public ResponseEntity<Faq> createFaq(@RequestBody Faq faq) {
        System.out.println("Received FAQ:" + faq);
        Faq createdFaq = faqService.createFaq(faq);
        return new ResponseEntity<>(createdFaq, HttpStatus.CREATED);
    }

    @PutMapping("/faqAdmin/update/{id}")
    public ResponseEntity<Faq> updateFaq(@PathVariable Long id, @RequestBody Faq faqDetails) {
        Faq updatedFaq = faqService.updateFaq(id, faqDetails);
        return new ResponseEntity<>(updatedFaq, HttpStatus.OK);
    }

    @DeleteMapping("/faqAdmin/delete/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Faq>> searchFaqs(@RequestParam String keyword, @RequestParam String type) {
        List<Faq> faqs;
        if ("title".equalsIgnoreCase(type)) {
            faqs = faqService.searchFaqsByTitle(keyword);
        } else if ("content".equalsIgnoreCase(type)) {
            faqs = faqService.searchFaqsByContent(keyword);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(faqs, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Map<String, Object>>> getAllCategories() {
        List<Map<String, Object>> categories = faqService.getFaqCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/categories-with-documents")
    public ResponseEntity<List<Map<String, Object>>> getAllCategoriesWithDocuments() {
        List<Map<String, Object>> categoriesWithDocuments = faqService.getFaqCategoriesWithDocuments();
        return new ResponseEntity<>(categoriesWithDocuments, HttpStatus.OK);
    }
}