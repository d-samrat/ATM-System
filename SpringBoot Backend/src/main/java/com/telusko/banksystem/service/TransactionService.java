package com.telusko.banksystem.service;

import com.telusko.banksystem.model.Transaction;
import com.telusko.banksystem.model.User;
import com.telusko.banksystem.repo.TransactionRepo;
import com.telusko.banksystem.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionRepo txRepo;

    @Autowired
    private UserRepo userRepo;

    public Transaction transfer(int id, Long amount, int id1) {
        User a = userService.getUserById(id);
        User b = userService.getUserById(id1);
        a.setBalance(a.getBalance()-amount);
        b.setBalance(b.getBalance()+amount);
        userRepo.save(a);
        userRepo.save(b);


        String tid = "TX"+UUID.randomUUID().toString().substring(0,8);
        Transaction tx1 = Transaction.builder()
                .transactionId(tid)
                .user(userService.getUserById(id))
                .transactionType("DEBIT")
                .amount(amount)
                .build();

        Transaction tx2 = Transaction.builder()
                .transactionId(tid)
                .user(userService.getUserById(id1))
                .transactionType("CREDIT")
                .amount(amount)
                .build();


        txRepo.save(tx1);
        txRepo.save(tx2);
        return tx1;
    }

    public List<Transaction> getAllTxById(int id) {
        return txRepo.findAllByUserId(id);
    }
}
