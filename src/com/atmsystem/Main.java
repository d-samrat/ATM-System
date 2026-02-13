package com.atmsystem;

import com.atmsystem.entities.Bank;
import com.atmsystem.entities.usertypes.MajorUser;
import com.atmsystem.entities.User;
import com.atmsystem.entities.usertypes.MinorUser;
import com.atmsystem.enums.TransactionType;
import com.atmsystem.service.TransactionService;

public class Main {
    public static void main(String[] args) {
        Bank kotak = new Bank("Kotak Mahindra", "HYD001");
        User samrat = new MajorUser("Samrat",4002,"1391",25000);
        User shresht = new MinorUser("Shresht",6002,"2006",20000);

        kotak.addUser(samrat);
        kotak.addUser(shresht);

        TransactionService transactionService = new TransactionService();

        transactionService.transactionOperation(TransactionType.DEBIT, samrat, shresht,20000);

        samrat.showTransactionHistory();

        transactionService.transactionOperation(TransactionType.DEPOSIT,samrat,samrat,10000);
        samrat.showTransactionHistory();


    }
}
