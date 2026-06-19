package com.telusko.transactionservice.service;

import com.telusko.transactionservice.model.Transaction;
import com.telusko.transactionservice.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo txRepo;

    public ResponseEntity<String> recordTransfer(long amount, long senderAccNo, long receiverAccNo) {
        String tid = "TX"+UUID.randomUUID().toString().substring(0,8);
        Transaction tx1 = Transaction.builder()
                .transactionId(tid)
                .accNo(senderAccNo)
                .transactionType("DEBIT")
                .amount(amount)
                .build();

        Transaction tx2 = Transaction.builder()
                .transactionId(tid)
                .accNo(receiverAccNo)
                .transactionType("CREDIT")
                .amount(amount)
                .build();

        txRepo.save(tx1);
        txRepo.save(tx2);
        return new ResponseEntity<>("Transaction Successful", HttpStatus.OK);
    }

    public ResponseEntity<String> recordDeposit(long accNo, long amount) {
        String tid = "TX"+UUID.randomUUID().toString().substring(0,8);

        Transaction tx1 = Transaction.builder()
                .transactionId(tid)
                .accNo(accNo)
                .transactionType("DEPOSIT")
                .amount(amount)
                .build();


        txRepo.save(tx1);

        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }

    public ResponseEntity<List<Transaction>> getTXHistory(long accNo) {
        List<Transaction> transactions = txRepo.findAllByAccNo(accNo);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}
