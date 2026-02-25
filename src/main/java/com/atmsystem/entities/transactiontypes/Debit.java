package com.atmsystem.entities.transactiontypes;

import com.atmsystem.entities.Transaction;
import com.atmsystem.exceptions.TransactionDenied;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Transient;

@Entity
@DiscriminatorValue("DEBIT")
public class Debit extends Transaction{
    @Transient
    private User usera;
    @Transient
    private User userb;

    public Debit(User usera, User userb, int amount){
        this.usera = usera;
        this.userb = userb;
        this.amount = amount;
    }

    public void process(){
            if (usera.transactionApproval(amount, TransactionType.DEBIT) && userb.transactionApproval(amount, TransactionType.CREDIT)) {
                usera.updateBalance(usera.getBalance() - amount);
                userb.updateBalance(userb.getBalance() + amount);
//                String transactionId = "TID_"+System.currentTimeMillis();
//                usera.updateTransactions(new Transaction( TransactionType.DEBIT,amount,usera));
//                userb.updateTransactions(new Transaction( TransactionType.CREDIT,amount,userb));
            }
            else{
                throw new TransactionDenied("Invalid Transaction");
            }


    }
}
