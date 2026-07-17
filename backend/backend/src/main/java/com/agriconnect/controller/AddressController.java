package com.agriconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.agriconnect.entity.Address;
import com.agriconnect.service.AddressService;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    // Add Address
    @PostMapping("/add")
    public Address addAddress(@RequestBody Address address) {
        return addressService.addAddress(address);
    }

    // Get Customer Addresses
    @GetMapping("/customer/{customerId}")
    public List<Address> getAddresses(@PathVariable Integer customerId) {
        return addressService.getAddressesByCustomer(customerId);
    }

    // Update Address
    @PutMapping("/{addressId}")
    public Address updateAddress(@PathVariable Integer addressId,
                                 @RequestBody Address address) {
        return addressService.updateAddress(addressId, address);
    }

    // Delete Address
    @DeleteMapping("/{addressId}")
    public String deleteAddress(@PathVariable Integer addressId) {
        addressService.deleteAddress(addressId);
        return "Address deleted successfully";
    }
}