package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.entity.Faq;
import com.hotel.lodgingCommander.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/faqBoard")
public class FaqController {

    private final FaqService faqService;

    @Autowired
    public FaqController(FaqService faqService) {
        this.faqService = faqService;
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/faqAdmin/listFaqs")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Faq>> getAllFaqs() {
        List<Faq> faqs = faqService.getAllFaqsSortedById();
        System.out.println("Sending FAQs:" + faqs);
        return new ResponseEntity<>(faqs, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/faqAdmin/faqs/{id}")
    public ResponseEntity<?> getFaqById(@PathVariable Long id) {
        Faq faq = faqService.getFaqById(id);
        return new ResponseEntity<>(faq, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/faqAdmin/Write/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Faq> createFaq(@PathVariable Long id, @RequestBody Faq faq) {
        System.out.println("Received FAQ:" + faq);
        Faq createdFaq = faqService.createFaq(faq);
        return new ResponseEntity<>(createdFaq, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/faqAdmin/update/{id}")
    public ResponseEntity<Faq> updateFaq(@PathVariable Long id, @RequestBody Faq faqDetails) {
        Faq updatedFaq = faqService.updateFaq(id, faqDetails);
        return new ResponseEntity<>(updatedFaq, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
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