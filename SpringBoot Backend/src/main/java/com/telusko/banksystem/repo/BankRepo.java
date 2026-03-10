package com.telusko.banksystem.repo;

import com.telusko.banksystem.model.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepo extends JpaRepository<Bank, Integer> {
}
