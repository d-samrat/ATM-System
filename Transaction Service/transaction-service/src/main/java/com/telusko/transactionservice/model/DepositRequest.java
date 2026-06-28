package com.telusko.transactionservice.model;

import lombok.Data;

@Data
public class DepositRequest {
    private long accNo;
    private long amount;
}
