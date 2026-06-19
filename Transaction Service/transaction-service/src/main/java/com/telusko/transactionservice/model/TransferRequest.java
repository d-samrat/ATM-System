package com.telusko.transactionservice.model;

import lombok.Data;

@Data
public class TransferRequest{
    private long amount;
    private long senderAccNo;
    private long receiverAccNo;
}
