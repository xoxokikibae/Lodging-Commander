package com.hotel.lodgingCommander.service;

import com.hotel.lodgingCommander.entity.Faq;
import com.hotel.lodgingCommander.exception.ResourceNotFoundException;
import com.hotel.lodgingCommander.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FaqService {

    private final FaqRepository faqRepository;

    @Autowired
    public FaqService(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }

    public Faq getFaqById(Long id) {
        return faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found for this id :: " + id));
    }

    public Faq createFaq(Faq faq) {
        return faqRepository.save(faq);
    }

    public Faq updateFaq(Long id, Faq faqDetails) {
        Faq existingFaq = faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found for this id ::" + id));

            existingFaq.setTitle(faqDetails.getTitle());
            existingFaq.setContent(faqDetails.getContent());

            // 수정 시간 업데이트
            existingFaq.setEditDateTime(LocalDateTime.now());

            return faqRepository.save(existingFaq);
        }

    public void deleteFaq(Long id) {
        Faq faq = faqRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("FAQ not found for this id" + id));
        faqRepository.delete(faq);
    }

    public List<Faq> searchFaqsByTitle(String keyword) {
        return faqRepository.findByTitleContaining(keyword);
    }

    public List<Faq> searchFaqsByContent(String keyword) {
        return faqRepository.findByContentContaining(keyword);
    }

    public List<Map<String,Object>> getFaqCategories() {
        List<Map<String,Object>> faqCategories = new ArrayList<>();
        return faqCategories;
    }

    public List<Map<String, Object>> getFaqCategoriesWithDocuments() {
        List<Map<String, Object>> faqCategoriesWithDocuments = new ArrayList<>();
        return faqCategoriesWithDocuments;
    }
}