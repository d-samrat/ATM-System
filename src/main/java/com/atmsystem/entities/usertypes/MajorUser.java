package com.atmsystem.entities.usertypes;

import com.atmsystem.enums.AccountType;
import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.util.HibernateUtil;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Query;
import org.hibernate.Session;

@Entity
@DiscriminatorValue("MAJOR")
public class MajorUser extends User {
    private final int MAX_BALANCE = Integer.MAX_VALUE;
    private final int MIN_BALANCE = 1000;

    public MajorUser(String name, String password) {
        super(name, password);
        accountType = AccountType.MAJOR;
    }

    public MajorUser() {
    }

    public boolean transactionApproval(int amount, TransactionType transactionType) {
        if (transactionType == TransactionType.DEBIT) {
            String name = this.getName();
            Session session = HibernateUtil.getSessionFactory().openSession();
            String HQL = "SELECT u.balance FROM User u WHERE u.name=?1";
            Integer bal = session.createQuery(HQL, Integer.class)
                    .setParameter(1,name)
                    .uniqueResult();
            this.balance = bal;

            return bal - amount > MIN_BALANCE;
        }
        else if(transactionType==TransactionType.DEPOSIT){
            return true;
        }
        else if(transactionType==TransactionType.CREDIT){
            return true;
        }
        else{
            return false;
        }
    }

}