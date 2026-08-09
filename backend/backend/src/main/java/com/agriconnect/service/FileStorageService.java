package com.agriconnect.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.agriconnect.config.FileUploadConfig;

@Service
public class FileStorageService {

    @Autowired
    private FileUploadConfig fileUploadConfig;

    public String uploadProductImage(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please select an image");
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                !(contentType.equals("image/jpeg")
                        || contentType.equals("image/png")
                        || contentType.equals("image/jpg")
                        || contentType.equals("image/webp"))) {

            throw new RuntimeException("Only JPG, PNG and WEBP images are allowed");
        }

        Path uploadPath = Paths.get(fileUploadConfig.getUploadDir());

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFileName = file.getOriginalFilename();

        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));

        String fileName = UUID.randomUUID() + extension;

        Path destination = uploadPath.resolve(fileName);

        Files.copy(
                file.getInputStream(),
                destination,
                StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/products/" + fileName;
    }
}