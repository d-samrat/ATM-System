package com.atmsystem.entities;

import com.atmsystem.enums.TransactionType;

public class Transaction {
    private String transactionId;
    private TransactionType transactionType;
    private int amount;
    private User user;

    public Transaction(String transactionId, TransactionType transactionType, int amount, User user){
        this.transactionId = transactionId;
        this.transactionType = transactionType;
        this.amount = amount;
        this.user = user;
    }

    public String getTransactionId(){
        return transactionId;
    }

    public int getTransactionAmount(){
        return amount;
    }
}
