package com.agriconnect.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.agriconnect.dto.ImageUploadResponse;
import com.agriconnect.service.FileStorageService;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/product-image")
    public ResponseEntity<ImageUploadResponse> uploadProductImage(
            @RequestParam("file") MultipartFile file) {

        try {

            String imageUrl = fileStorageService.uploadProductImage(file);

            return ResponseEntity.ok(
                    new ImageUploadResponse(
                            true,
                            "Image uploaded successfully",
                            imageUrl));

        } catch (IOException e) {

            return ResponseEntity.badRequest().body(
                    new ImageUploadResponse(
                            false,
                            "Failed to upload image",
                            null));

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    new ImageUploadResponse(
                            false,
                            e.getMessage(),
                            null));
        }
    }
}