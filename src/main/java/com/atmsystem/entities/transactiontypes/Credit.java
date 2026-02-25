package com.atmsystem.entities.transactiontypes;
import com.atmsystem.entities.Transaction;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.exceptions.TransactionDenied;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Transient;

@Entity
@DiscriminatorValue("CREDIT")
public class Credit extends Transaction{
    @Transient
    private User usera;
    @Transient
    private User userb;

    @Transient
    private Transaction transactiona;
    @Transient
    private Transaction transactionb;

    public Credit(User usera, User userb, int amount){
        super();
        this.usera = usera;
        this.userb = userb;
        this.amount = amount;
    }

    public void process(){
            if (usera.transactionApproval(amount, TransactionType.CREDIT) && userb.transactionApproval(amount, TransactionType.DEBIT)) {
                usera.updateBalance(usera.getBalance() + amount);
                userb.updateBalance(userb.getBalance() - amount);
                String id = "T"+System.currentTimeMillis();
                usera.addTransactions(new Transaction(id, TransactionType.CREDIT,amount,usera));
                userb.addTransactions(new Transaction(id,TransactionType.DEBIT,amount,userb));
            }

            else{
                throw new TransactionDenied("Invalid Transaction");
            }
    }
}
