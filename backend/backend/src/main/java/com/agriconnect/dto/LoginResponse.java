package com.agriconnect.dto;

public class LoginResponse {

    private boolean success;
    private String message;
    private String token;
    private Integer retailerId;

    public LoginResponse() {
    }

    public LoginResponse(
            boolean success,
            String message,
            String token,
            Integer retailerId) {

        this.success = success;
        this.message = message;
        this.token = token;
        this.retailerId = retailerId;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getRetailerId() {
        return retailerId;
    }

    public void setRetailerId(Integer retailerId) {
        this.retailerId = retailerId;
    }
}