package com.agriconnect.dto;

public class ImageUploadResponse {

    private boolean success;
    private String message;
    private String imageUrl;

    public ImageUploadResponse() {
    }

    public ImageUploadResponse(boolean success, String message, String imageUrl) {
        this.success = success;
        this.message = message;
        this.imageUrl = imageUrl;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}