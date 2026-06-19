package com.telusko.accountservice.feign;


import com.telusko.accountservice.model.DepositRequest;
import com.telusko.accountservice.model.Transaction;
import com.telusko.accountservice.model.TransferRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("TRANSACTION-SERVICE")
public interface AccountInterface {
    @GetMapping("/tx/history")
    public ResponseEntity<List<Transaction>> getTXHistory(@RequestParam long accNo);

    @PostMapping("/tx/transfer")
    public ResponseEntity<String> recordTransfer(@RequestBody TransferRequest transferRequest);

    @PostMapping("/tx/deposit")
    public ResponseEntity<String> recordDeposit(@RequestBody DepositRequest depositRequest);
}
