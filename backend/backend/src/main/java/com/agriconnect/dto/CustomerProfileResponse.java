package com.agriconnect.dto;

public class CustomerProfileResponse {

    private Integer customerId;
    private String fullName;
    private String email;
    private String mobile;
    private String address;
    private String city;
    private String state;
    private String pincode;

    public CustomerProfileResponse() {
    }

    public CustomerProfileResponse(Integer customerId,
                                   String fullName,
                                   String email,
                                   String mobile,
                                   String address,
                                   String city,
                                   String state,
                                   String pincode) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
}