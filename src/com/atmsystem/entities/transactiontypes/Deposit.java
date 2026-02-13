package com.atmsystem.entities.transactiontypes;

import com.atmsystem.entities.Transaction;
import com.atmsystem.exceptions.TransactionDenied;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;

public class Deposit {
    private User usera;
    private int amount;

    public Deposit(User usera, int amount){
        this.usera = usera;
        this.amount = amount;
    }

    public void process(){
            if(usera.transactionApproval(amount, TransactionType.DEPOSIT)){
                usera.updateBalance(usera.getBalance() + amount);
                String transactionId = "TID_"+System.currentTimeMillis();
                usera.updateTransactions(new Transaction(transactionId, TransactionType.DEPOSIT,amount,usera));
            }

            else{
                throw new TransactionDenied("Invalid Deposit");
        }
    }
}
