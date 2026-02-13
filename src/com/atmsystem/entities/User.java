package com.atmsystem.entities;

import com.atmsystem.enums.AccountType;
import com.atmsystem.enums.TransactionType;

import java.util.HashMap;
import java.util.Map;

public abstract class User {
    private int userId;
    private String name;
    private String password;
    protected int balance;
    private HashMap<String, Integer> transactionHistory;
    public AccountType accountType;

    public User(String name, int userId,String password, int balance){
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.balance = balance;
        this.transactionHistory = new HashMap<String, Integer>();
    }

    public int getBalance(){
        return balance;
    }

    public void updateBalance(int updatedBalance){
        this.balance = updatedBalance;
    }

    public String getName(){
        return name;
    }

    public int getId(){
        return userId;
    }

    public void updateTransactions(Transaction transaction){
        transactionHistory.put(transaction.getTransactionId(), transaction.getTransactionAmount());
    }

    public abstract boolean transactionApproval(int amount, TransactionType transactionType);

    public AccountType getAccountType(){
        return accountType;
    }

    public void showTransactionHistory(){
        for(Map.Entry<String,Integer> entry: transactionHistory.entrySet()){
            System.out.println("Transaction id: "+entry.getKey()+", Amount: "+entry.getValue());
        }
    }
}
