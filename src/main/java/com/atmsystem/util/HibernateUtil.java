package com.atmsystem.util;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static{
        try{
            sessionFactory = new Configuration()
                    .configure()
                    .buildSessionFactory();
        }
        catch (Exception e){
            throw e;
        }
    }
    public static SessionFactory getSessionFactory(){
        return sessionFactory;
    }


}
