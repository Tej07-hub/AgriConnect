package com.agriconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.agriconnect.dto.AddressRequest;
import com.agriconnect.dto.AddressResponse;
import com.agriconnect.entity.Address;
import com.agriconnect.entity.Customer;
import com.agriconnect.repository.AddressRepository;
import com.agriconnect.repository.CustomerRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private Integer getLoggedInCustomerId(Authentication authentication) {

        String email = authentication.getName();

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return customer.getCustomerId();
    }

    // Add Address
    public Address addAddress(AddressRequest request,
                              Authentication authentication) {

        Integer customerId = getLoggedInCustomerId(authentication);

        if (Boolean.TRUE.equals(request.getIsDefault())) {

            addressRepository.findByCustomerIdAndIsDefaultTrue(customerId)
                    .ifPresent(address -> {
                        address.setIsDefault(false);
                        addressRepository.save(address);
                    });
        }

        Address address = new Address();

        address.setCustomerId(customerId);
        address.setFullName(request.getFullName());
        address.setMobile(request.getMobile());
        address.setHouse(request.getHouse());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setIsDefault(request.getIsDefault());

        return addressRepository.save(address);
    }

    // Get My Addresses
    public List<AddressResponse> getMyAddresses(Authentication authentication) {

        Integer customerId = getLoggedInCustomerId(authentication);

        return addressRepository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Update Address
    public Address updateAddress(Integer addressId,
                                 AddressRequest request,
                                 Authentication authentication) {

        Integer customerId = getLoggedInCustomerId(authentication);

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (Boolean.TRUE.equals(request.getIsDefault())) {

            addressRepository.findByCustomerIdAndIsDefaultTrue(customerId)
                    .ifPresent(existing -> {
                        existing.setIsDefault(false);
                        addressRepository.save(existing);
                    });
        }

        address.setFullName(request.getFullName());
        address.setMobile(request.getMobile());
        address.setHouse(request.getHouse());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setIsDefault(request.getIsDefault());

        return addressRepository.save(address);
    }

    // Delete Address
    public void deleteAddress(Integer addressId,
                              Authentication authentication) {

        Integer customerId = getLoggedInCustomerId(authentication);

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Unauthorized");
        }

        addressRepository.delete(address);
    }

    // Convert Entity to Response
    private AddressResponse mapToResponse(Address address) {

        AddressResponse response = new AddressResponse();

        response.setAddressId(address.getAddressId());
        response.setFullName(address.getFullName());
        response.setMobile(address.getMobile());
        response.setHouse(address.getHouse());
        response.setStreet(address.getStreet());
        response.setCity(address.getCity());
        response.setState(address.getState());
        response.setPincode(address.getPincode());
        response.setIsDefault(address.getIsDefault());

        return response;
    }
}