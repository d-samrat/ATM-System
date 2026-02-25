package com.atmsystem.entities.usertypes;

import com.atmsystem.entities.User;
import com.atmsystem.enums.AccountType;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.util.HibernateUtil;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import org.hibernate.Session;

@Entity
@DiscriminatorValue("MINOR")
public class MinorUser extends User {

    private final int MAX_BALANCE = 100000;
    private final int MIN_BALANCE = 0;

    public MinorUser() {
    }

    public MinorUser(String name, String password){
        super(name,password);
        accountType = AccountType.MAJOR;
    }

    public boolean transactionApproval(int amount, TransactionType transactionType) {
        if (transactionType == TransactionType.CREDIT) {
            String name = this.getName();
            Session session = HibernateUtil.getSessionFactory().openSession();
            String HQL = "SELECT u.balance FROM User u WHERE u.name=?1";
            Integer bal = session.createQuery(HQL, Integer.class)
                    .setParameter(1,name)
                    .uniqueResult();
            this.balance = bal;
            return bal + amount < MAX_BALANCE;
        }
        else if(transactionType==TransactionType.DEPOSIT){
            return true;
        }
        else if(transactionType==TransactionType.DEBIT){
            return balance-amount>MIN_BALANCE;
        }
        else{
            return false;
        }

    }

}
