package com.atmsystem.service;

import com.atmsystem.entities.Transaction;
import com.atmsystem.entities.transactiontypes.Credit;
import com.atmsystem.entities.User;
import com.atmsystem.entities.transactiontypes.Debit;
import com.atmsystem.entities.transactiontypes.Deposit;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.interfaces.TransactionInterface;
import com.atmsystem.util.HibernateUtil;
import org.hibernate.Session;

import java.util.List;

public class TransactionService implements TransactionInterface {

    public TransactionService() {
    }

    @Override
    public void transactionOperation(TransactionType transactionType, User usera, User userb, int amount) {
        switch (transactionType){
            case CREDIT:
                Credit credit = new Credit(usera, userb, amount);
                credit.process();
                return;
            case DEBIT:
                Debit debit = new Debit(usera, userb, amount);
                debit.process();
                return;
            case DEPOSIT:
                Deposit deposit = new Deposit(usera, amount);
                deposit.process();
                return;
        }
    }

    public List<Transaction> getTransactionHistory(User u){
        Session session = HibernateUtil.getSessionFactory().openSession();

        List<Transaction> res = session.createQuery("FROM Transaction t where t.user=?1")
                .setParameter(1,u)
                .getResultList();
        return res;
    }
}
