package com.agriconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Address;
import com.agriconnect.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    // Add Address
    public Address addAddress(Address address) {
        return addressRepository.save(address);
    }

    // Get all addresses of a customer
    public List<Address> getAddressesByCustomer(Integer customerId) {
        return addressRepository.findByCustomerId(customerId);
    }

    // Update Address
    public Address updateAddress(Integer addressId, Address updatedAddress) {

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setFullName(updatedAddress.getFullName());
        address.setMobileNumber(updatedAddress.getMobileNumber());
        address.setAddressLine1(updatedAddress.getAddressLine1());
        address.setAddressLine2(updatedAddress.getAddressLine2());
        address.setCity(updatedAddress.getCity());
        address.setState(updatedAddress.getState());
        address.setPincode(updatedAddress.getPincode());

        return addressRepository.save(address);
    }

    // Delete Address
    public void deleteAddress(Integer addressId) {
        addressRepository.deleteById(addressId);
    }
}