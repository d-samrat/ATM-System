package com.atmsystem.interfaces;

import com.atmsystem.entities.User;
import com.atmsystem.enums.TransactionType;

public interface TransactionInterface {
    public void transactionOperation(TransactionType transactionType, User usera, User userb, int amount);
}
