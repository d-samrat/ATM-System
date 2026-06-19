package com.telusko.transactionservice.feign;

import com.telusko.transactionservice.model.Transaction;
import com.telusko.transactionservice.model.TransferRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("ACCOUNT-SERVICE")
public interface TransactionInterface {


    @GetMapping("/account/balance")
    public ResponseEntity<Long> getBalance(@RequestParam long accountNo);

    @PostMapping("/account/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferRequest transferRequest);

    @GetMapping("/account/txhistory")
    public ResponseEntity<List<Transaction>> getTxHistory(@RequestParam long accountNo);
}
