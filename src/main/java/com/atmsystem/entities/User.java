package com.atmsystem.entities;

import com.atmsystem.enums.AccountType;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.util.HibernateUtil;
import jakarta.persistence.*;
import com.atmsystem.entities.Transaction;
import org.hibernate.Session;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name="users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type")
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String password;
    protected int balance;
    @OneToMany(mappedBy = "user")
    private List<Transaction> transactionHistory = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name="bank_id")
    private Bank bank;

    @Transient
    public AccountType accountType;

    public User(String name,String password){
        this.name = name;
        this.password = password;
        this.balance = balance;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    public User() {
    }

    public int getBalance(){
        Session session = HibernateUtil.getSessionFactory().openSession();
        int id = this.getId();
        String hql = "SELECT u.balance FROM User u WHERE u.id=?1";
        Integer bal = session.createQuery(hql, Integer.class)
                .setParameter(1,id)
                .uniqueResult();
        session.close();
        return bal;
    }

    public void updateBalance(int updatedBalance){
        Session session = HibernateUtil.getSessionFactory().openSession();
        org.hibernate.Transaction tx = session.beginTransaction();
        this.balance = updatedBalance;
        session.merge(this);
        tx.commit();
        session.close();
    }

    public String getName(){
        return name;
    }

    public int getId(){
        return id;
    }

    public void addTransactions(Transaction transaction){
//        transactionHistory.add(transaction.getTransactionId(), transaction.getTransactionAmount());
        Session session = HibernateUtil.getSessionFactory().openSession();
        org.hibernate.Transaction tx = session.beginTransaction();
        session.persist(transaction);
        tx.commit();
        session.close();
    }

    public abstract boolean transactionApproval(int amount, TransactionType transactionType);

    public AccountType getAccountType(){
        return accountType;
    }

    public String getUserType(){
//        Session session = HibernateUtil.getSessionFactory().openSession();
//        String userType = session.createQuery("SELECT u.usertype FROM User u WHERE u.name=?1",String.class)
//                .setParameter(1,this.getName())
//                .uniqueResult();
//        return userType;
        return this.getClass().getSimpleName();
    }


//    public void showTransactionHistory(){
//        for(Map.Entry<String,Integer> entry: transactionHistory.entrySet()){
//            System.out.println("Transaction id: "+entry.getKey()+", Amount: "+entry.getValue());
//        }
//    }
}
