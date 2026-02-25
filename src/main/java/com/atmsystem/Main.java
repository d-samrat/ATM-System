package com.atmsystem;

import com.atmsystem.entities.Bank;
import com.atmsystem.entities.usertypes.MajorUser;
import com.atmsystem.entities.User;
import com.atmsystem.entities.usertypes.MinorUser;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.service.BankService;
import com.atmsystem.service.TransactionService;
import com.atmsystem.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;



public class Main {
    public static void main(String[] args) {
        //Initializing Bank
        Bank one = initializeBank();


        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        //Creating Users and saving
        User samrat = new MajorUser("Samrat", "0000");
        samrat.setBank(one);

        User shresht = new MinorUser("Shresht","1111");
        shresht.setBank(one);

        session.persist(samrat);
        session.persist(shresht);
        tx.commit();

        //Depositing amount in accounts
        TransactionService service = new TransactionService();
        service.transactionOperation(TransactionType.DEPOSIT, samrat,samrat,20000);
        service.transactionOperation(TransactionType.DEPOSIT, shresht,shresht,20000);

        //Crediting amount from one account to another
        service.transactionOperation(TransactionType.CREDIT,shresht,samrat,500);
        //Depositing amount to one account
        service.transactionOperation(TransactionType.DEPOSIT, samrat, samrat,10000);

        //Show list of Users in a bank
        BankService bankService = new BankService();
        for(User u: bankService.getUsersList(one)){
            System.out.print("Username: "+u.getName()+" | Balance: "+u.getBalance()+" |  Account Type: "+u.getUserType());
            System.out.println();
        }

        //Total amount in a Bank Branch
        System.out.println(one.getName()+"'s total holding: "+bankService.bankBalance(one));

        //Getting transaction history
        List<com.atmsystem.entities.Transaction> res = service.getTransactionHistory(samrat);

        for(com.atmsystem.entities.Transaction t: res){
            System.out.print("Transaction id: "+t.getTransactionId()+" | Transaction type: "+t.getTransactionType()+" | Amount: "+t.getTransactionAmount()+" | "+t.getUsername());
            System.out.println();
        }

        session.close();
    }

        public static Bank initializeBank(){
            Bank kotak = new Bank("Kotak");
            try {
                Session session = HibernateUtil.getSessionFactory().openSession();
                Transaction tx = session.beginTransaction();
                session.persist(kotak);
                tx.commit();
                session.close();
                return kotak;
            }
            catch (Exception e){
                throw e;
            }
        }
}

