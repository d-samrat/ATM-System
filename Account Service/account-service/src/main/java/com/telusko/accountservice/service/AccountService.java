package com.telusko.accountservice.service;

import com.telusko.accountservice.feign.AccountInterface;
import com.telusko.accountservice.model.Account;
import com.telusko.accountservice.model.DepositRequest;
import com.telusko.accountservice.model.Transaction;
import com.telusko.accountservice.model.TransferRequest;
import com.telusko.accountservice.repo.AccountRepo;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@Builder
public class AccountService {
    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    AccountInterface accountInterface;

    public ResponseEntity<Long> getBalance(long accountNo) {
       return new ResponseEntity<>(accountRepo.findByAccountNo(accountNo).getBalance(),HttpStatus.OK);
    }

    public ResponseEntity<String> registerAccount(long authId, String holderName) {
        Account newAccount = new Account();
        newAccount.setAccountNo(Math.round(Math.random()*1000000000));
        newAccount.setHolderName(holderName);
        newAccount.setAuthId(authId);
        newAccount.setBalance(0);

        accountRepo.save(newAccount);

        return new ResponseEntity<>("Account Successfully Registered", HttpStatus.CREATED);
    }

    public ResponseEntity<String> depositAmount(long accountNo, long amount) {
        try {
            Account temp = accountRepo.findByAccountNo(accountNo);
            long balance = temp.getBalance();
            temp.setBalance(balance + amount);
            accountRepo.save(temp);
            DepositRequest request = new DepositRequest();
            request.setAccNo(accountNo);
            request.setAmount(amount);
            accountInterface.recordDeposit(request);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Deposit Successful", HttpStatus.OK);

    }

    public ResponseEntity<String> transfer(long senderAccNo, long amount, long receiverAccNo) {
        try {
            Account sender = accountRepo.findByAccountNo(senderAccNo);
            Account receiver = accountRepo.findByAccountNo(receiverAccNo);

            sender.setBalance(sender.getBalance() - amount);
            receiver.setBalance(receiver.getBalance() + amount);

            accountRepo.save(sender);
            accountRepo.save(receiver);

            accountInterface.recordTransfer(new TransferRequest(amount,senderAccNo,receiverAccNo));
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("Transfer Successful", HttpStatus.OK);
    }

    public ResponseEntity<List<Transaction>> getTxHistory(long accountNo) {
        ResponseEntity<List<Transaction>> txHistory = accountInterface.getTXHistory(accountNo);

        return txHistory;
    }

    public long getAccountNoByAuthId(long authId){
        Account account = accountRepo.findByAuthId(authId);
        if(account==null){
            throw new RuntimeException("Account not found for this user");
        }
        return account.getAccountNo();
    }
}
