package com.atmsystem.entities.transactiontypes;

import com.atmsystem.entities.Transaction;
import com.atmsystem.exceptions.TransactionDenied;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Transient;

@Entity
@DiscriminatorValue("DEPOSIT")
public class Deposit extends Transaction {
    @Transient
    private User usera;

    public Deposit(User usera, int amount){
        this.usera = usera;
        this.amount = amount;
    }

    public void process(){
            if(usera.transactionApproval(amount, TransactionType.DEPOSIT)){
                usera.updateBalance(usera.getBalance() + amount);
                String id = "T"+System.currentTimeMillis();
                usera.addTransactions(new Transaction(id,TransactionType.DEPOSIT,amount,usera));
//                usera.updateTransactions(new Transaction(TransactionType.DEPOSIT,amount,usera));
            }

            else{
                throw new TransactionDenied("Invalid Deposit");
        }
    }
}
