package com.atmsystem.exceptions;

public class TransactionDenied extends RuntimeException{
    public TransactionDenied(String message){
        super(message);
    }
}
