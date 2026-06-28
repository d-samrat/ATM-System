package com.telusko.transactionservice.repo;


import com.telusko.transactionservice.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {
    List<Transaction> findAllByAccNo(long accNo);
}
