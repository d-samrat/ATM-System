package com.atmsystem.entities;

import com.atmsystem.enums.TransactionType;
import jakarta.persistence.*;

@Entity
@Table(name="transactions")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String transactionId;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    protected int amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Transaction() {
    }

    public Transaction(String transactionId, TransactionType transactionType, int amount, User user){
        this.transactionType = transactionType;
        this.amount = amount;
        this.user = user;
        this.transactionId = transactionId;
    }

    @Override
    public String toString() {
        return "id=" + id +
                ", transactionId='" + transactionId + '\'' +
                ", transactionType=" + transactionType +
                ", amount=" + amount +
                ", user=" + user.getName();
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public int getTransactionId(){
        return id;
    }

    public int getTransactionAmount(){
        return amount;
    }

    public String getUsername(){
        return user.getName();
    }
}
