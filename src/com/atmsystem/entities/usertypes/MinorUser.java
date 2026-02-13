package com.atmsystem.entities.usertypes;

import com.atmsystem.entities.User;
import com.atmsystem.enums.AccountType;
import com.atmsystem.enums.TransactionType;

public class MinorUser extends User {
    private AccountType accountType = AccountType.MINOR;
    private final int MAX_BALANCE = 100000;
    private final int MIN_BALANCE = 0;

    public MinorUser(String name, int userId, String password, int balance){
        super(name,userId,password,balance);
    }

    public boolean transactionApproval(int amount, TransactionType transactionType) {
        if (transactionType == TransactionType.CREDIT) {
            return balance + amount < MAX_BALANCE;
        }
        else if(transactionType==TransactionType.DEPOSIT){
            return true;
        }
        else if(transactionType==TransactionType.DEBIT){
            return balance-amount>MIN_BALANCE;
        }
        else{
            return false;
        }

    }

}
