package com.telusko.banksystem.controller;

import com.telusko.banksystem.model.Transaction;
import com.telusko.banksystem.model.User;
import com.telusko.banksystem.model.dto.AmountRequest;
import com.telusko.banksystem.model.dto.LoginRequest;
import com.telusko.banksystem.model.dto.TransferRequest;
import com.telusko.banksystem.service.BankService;
import com.telusko.banksystem.service.TransactionService;
import com.telusko.banksystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private BankService bankService;

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/bank/{id}/user")
    public ResponseEntity<User> addUser(@PathVariable int id, @RequestBody User user){
        user.setBank(bankService.getBank(id));
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PostMapping("/user/{id}/deposit")
    public ResponseEntity<User> deposit(@PathVariable int id, @RequestBody AmountRequest amountRequest){
        return new ResponseEntity<>(userService.depositAmt(id,amountRequest.amount()), HttpStatus.OK);
    }

    @GetMapping("/user/{id}/balance")
    public ResponseEntity<Long> getBalance(@PathVariable int id){
        return new ResponseEntity<>(userService.getBalance(id), HttpStatus.OK);
    }

    @PostMapping("/user/{id}/transfer")
    public ResponseEntity<Transaction> transfer(@PathVariable int id, @RequestBody TransferRequest transferRequest){
        return new ResponseEntity<>(transactionService.transfer(id, transferRequest.amount(), transferRequest.id()),HttpStatus.OK);
    }

    @GetMapping("/user/{id}/txhistory")
    public ResponseEntity<List<Transaction>> getTxHistory(@PathVariable int id){
        return new ResponseEntity<>(transactionService.getAllTxById(id),HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByUsername(loginRequest.username());
        if (user == null || !loginRequest.password().equals(user.getPassword())) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
