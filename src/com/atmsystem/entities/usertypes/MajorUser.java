package com.atmsystem.entities.usertypes;

import com.atmsystem.enums.AccountType;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;

public class MajorUser extends User {
    private AccountType accountType = AccountType.MAJOR;
    private final int MIN_BALANCE = 1000;

    public MajorUser(String name, int userId, String password, int balance) {
        super(name, userId, password, balance);
    }

    public boolean transactionApproval(int amount, TransactionType transactionType) {
        if (transactionType == TransactionType.DEBIT) {
            return balance - amount > MIN_BALANCE;
        }
        else if(transactionType==TransactionType.DEPOSIT){
            return true;
        }
        else if(transactionType==TransactionType.CREDIT){
            return true;
        }
        else{
            return false;
        }
    }

}