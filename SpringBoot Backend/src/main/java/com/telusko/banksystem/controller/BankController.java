package com.telusko.banksystem.controller;

import com.telusko.banksystem.model.Bank;
import com.telusko.banksystem.model.User;
import com.telusko.banksystem.service.BankService;
import com.telusko.banksystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")

public class BankController {
    @Autowired
    private BankService bankService;

    @Autowired
    private UserService userService;

    @PostMapping("/bank")
    public ResponseEntity<Bank> addBank(@RequestBody Bank bank) {
        Bank newBank = bankService.addBank(bank);
        return new ResponseEntity<>(newBank, HttpStatus.ACCEPTED);
    }

    @GetMapping("/banks")
    public ResponseEntity<List<Bank>> getAllBanks(){
        return new ResponseEntity<>(bankService.getAllBanks(),HttpStatus.OK);
    }

    @GetMapping("/bank/{id}/users")
    public ResponseEntity<List<User>> getAllUsers(@PathVariable int id){
        List<User> users = userService.getAllUsersByBankId(id);
        System.out.println(users);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


}

