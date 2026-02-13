package com.atmsystem.entities.transactiontypes;
import com.atmsystem.entities.Transaction;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.exceptions.TransactionDenied;

public class Credit {
    private User usera;
    private User userb;
    private int amount;
    private Transaction transactiona;
    private Transaction transactionb;

    public Credit(User usera, User userb, int amount){
        this.usera = usera;
        this.userb = userb;
        this.amount = amount;
    }

    public void process(){
            if (usera.transactionApproval(amount, TransactionType.CREDIT) && userb.transactionApproval(amount, TransactionType.DEBIT)) {
                usera.updateBalance(usera.getBalance() + amount);
                userb.updateBalance(userb.getBalance() - amount);
                String transactionId = "TID_"+System.currentTimeMillis();
                usera.updateTransactions(new Transaction(transactionId, TransactionType.CREDIT,amount,usera));
                userb.updateTransactions(new Transaction(transactionId, TransactionType.DEBIT,amount,userb));
            }

            else{
                throw new TransactionDenied("Invalid Transaction");
            }
    }
}
