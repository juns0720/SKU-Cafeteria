package com.sungkyul.cafeteria.review.controller;

import com.sungkyul.cafeteria.review.dto.ReviewRequest;
import com.sungkyul.cafeteria.review.dto.ReviewResponse;
import com.sungkyul.cafeteria.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<Page<ReviewResponse>> getReviews(
            @RequestParam Long menuId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication
    ) {
        Long currentUserId = (authentication != null)
                ? (Long) authentication.getPrincipal()
                : null;
        return ResponseEntity.ok(reviewService.getReviews(menuId, page, size, currentUserId));
    }

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @Valid @RequestBody ReviewRequest request,
            Authentication authentication
    ) {
        Long userId = (Long) authentication.getPrincipal();
        ReviewResponse response = reviewService.createReview(userId, request);
        return ResponseEntity.created(URI.create("/api/v1/reviews/" + response.id())).body(response);
    }
}
