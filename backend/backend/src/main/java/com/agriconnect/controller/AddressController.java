package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.dto.AddressRequest;
import com.agriconnect.dto.AddressResponse;
import com.agriconnect.entity.Address;
import com.agriconnect.service.AddressService;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping
    public ResponseEntity<Address> addAddress(
            @RequestBody AddressRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                addressService.addAddress(request, authentication));
    }

    @GetMapping
    public ResponseEntity<List<AddressResponse>> getMyAddresses(
            Authentication authentication) {

        return ResponseEntity.ok(
                addressService.getMyAddresses(authentication));
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<Address> updateAddress(
            @PathVariable Integer addressId,
            @RequestBody AddressRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                addressService.updateAddress(addressId, request, authentication));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddress(
            @PathVariable Integer addressId,
            Authentication authentication) {

        addressService.deleteAddress(addressId, authentication);

        return ResponseEntity.ok("Address deleted successfully.");
    }
}