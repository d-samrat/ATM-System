package com.telusko.transactionservice.controller;

import com.telusko.transactionservice.model.DepositRequest;
import com.telusko.transactionservice.model.Transaction;
import com.telusko.transactionservice.model.TransferRequest;
import com.telusko.transactionservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tx")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping("/history")
    public ResponseEntity<List<Transaction>> getTXHistory(@RequestParam long accNo){
        return transactionService.getTXHistory(accNo);
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> recordTransfer(@RequestBody TransferRequest transferRequest){
        return transactionService.recordTransfer(transferRequest.getAmount(), transferRequest.getSenderAccNo(), transferRequest.getReceiverAccNo());
    }

    @PostMapping("/deposit")
    public ResponseEntity<String> recordDeposit(@RequestBody DepositRequest depositRequest){
        return transactionService.recordDeposit(depositRequest.getAccNo(), depositRequest.getAmount());
    }
}
