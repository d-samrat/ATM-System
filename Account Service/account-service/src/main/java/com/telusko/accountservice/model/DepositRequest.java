package com.telusko.accountservice.model;

import lombok.Data;

@Data
public class DepositRequest {
    private long accNo;
    private long amount;
}
