package com.atmsystem.entities.transactiontypes;

import com.atmsystem.entities.Transaction;
import com.atmsystem.exceptions.TransactionDenied;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;

public class Debit {
    private User usera;
    private User userb;
    private int amount;

    public Debit(User usera, User userb, int amount){
        this.usera = usera;
        this.userb = userb;
        this.amount = amount;
    }

    public void process(){
            if (usera.transactionApproval(amount, TransactionType.DEBIT) && userb.transactionApproval(amount, TransactionType.CREDIT)) {
                usera.updateBalance(usera.getBalance() - amount);
                userb.updateBalance(userb.getBalance() + amount);
                String transactionId = "TID_"+System.currentTimeMillis();
                usera.updateTransactions(new Transaction(transactionId, TransactionType.DEBIT,amount,usera));
                userb.updateTransactions(new Transaction(transactionId, TransactionType.CREDIT,amount,userb));
            }
            else{
                throw new TransactionDenied("Invalid Transaction");
            }


    }
}
