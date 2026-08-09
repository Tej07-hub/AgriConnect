package com.agriconnect.dto;

public class RetailerProfileResponse {

    private Integer retailerId;
    private String fullName;
    private String shopName;
    private String email;
    private String mobile;
    private String address;
    private String city;
    private String state;
    private String pincode;

    public RetailerProfileResponse() {
    }

    public RetailerProfileResponse(Integer retailerId,
                                   String fullName,
                                   String shopName,
                                   String email,
                                   String mobile,
                                   String address,
                                   String city,
                                   String state,
                                   String pincode) {
        this.retailerId = retailerId;
        this.fullName = fullName;
        this.shopName = shopName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
    }

    public Integer getRetailerId() {
        return retailerId;
    }

    public void setRetailerId(Integer retailerId) {
        this.retailerId = retailerId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
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