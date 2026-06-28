package com.telusko.accountservice.controller;


import com.telusko.accountservice.model.*;
import com.telusko.accountservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;


    @PostMapping("register")
    public ResponseEntity<String> registerAccount(@RequestBody CreateAccountRequest request){

        return accountService.registerAccount(request.getAuthId(), request.getHolderName());
    }


    @PostMapping("deposit")
    public ResponseEntity<String> deposit(@RequestBody DepositRequest request,
                                          @AuthenticationPrincipal Long authId) {

        long accountNo = accountService.getAccountNoByAuthId(authId);
        return accountService.depositAmount(accountNo, request.getAmount());
    }


    @GetMapping("balance")
    public ResponseEntity<Long> getBalance(@AuthenticationPrincipal long authId){
        long accountNo = accountService.getAccountNoByAuthId(authId);
        return accountService.getBalance(accountNo);
    }

    @PostMapping("transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest transferRequest,
                                           @AuthenticationPrincipal Long authId){
        long senderAccNo = accountService.getAccountNoByAuthId(authId);
        return accountService.transfer(senderAccNo,transferRequest.getAmount(), transferRequest.getReceiverAccNo());
    }

    @GetMapping("txhistory")
    public ResponseEntity<List<Transaction>> getTxHistory(@AuthenticationPrincipal Long authId){
        long accountNo = accountService.getAccountNoByAuthId(authId);
        return accountService.getTxHistory(accountNo);
    }



}