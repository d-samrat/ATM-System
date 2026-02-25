package com.atmsystem.service;

import com.atmsystem.entities.Bank;
import com.atmsystem.entities.User;
import com.atmsystem.util.HibernateUtil;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class BankService {
    public List<User> usersList;

    public List<User> getUsersList(Bank bank){
        Session session = HibernateUtil.getSessionFactory().openSession();

        long id = bank.getId();
        String hql = "FROM User u WHERE u.bank=?1";
        List<User> res = session.createQuery(hql,User.class)
                .setParameter(1,bank)
                .getResultList();
        session.close();
        return res;
    }

    public Long bankBalance(Bank bank){
        Session session = HibernateUtil.getSessionFactory().openSession();
        Long bankbal = session.createQuery("SELECT SUM(u.balance) FROM User u WHERE u.bank=?1",Long.class)
                .setParameter(1,bank)
                .getSingleResult();

        return bankbal;
    }
}
