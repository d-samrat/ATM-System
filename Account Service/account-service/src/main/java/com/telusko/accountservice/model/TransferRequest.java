package com.telusko.accountservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransferRequest {
    private long amount;
    private long senderAccNo;
    private long receiverAccNo;
}
