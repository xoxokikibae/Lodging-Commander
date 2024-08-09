package com.hotel.lodgingCommander.controller;

import com.hotel.lodgingCommander.entity.Faq;
import com.hotel.lodgingCommander.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
public class FaqController {

    private final FaqService faqService;

    @Autowired
    public FaqController(FaqService faqService) {
        this.faqService = faqService;
    }

    @GetMapping
    public ResponseEntity<List<Faq>> getAllFaqs() {
        List<Faq> faqs = faqService.getAllFaqs();
        return new ResponseEntity<>(faqs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Faq> getFaqById(@PathVariable Long id) {
        Faq faq = faqService.getFaqById(id);
        return new ResponseEntity<>(faq,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Faq> createFaq(@RequestBody Faq faq) {
        Faq createdFaq = faqService.createFaq(faq);
        return new ResponseEntity<>(createdFaq, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Faq> updateFaq(@PathVariable Long id, @RequestBody Faq faqDetails) {
        Faq updatedFaq = faqService.updateFaq(id, faqDetails);
      return new ResponseEntity<>(updatedFaq, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
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
}
