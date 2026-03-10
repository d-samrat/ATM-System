package com.telusko.banksystem.service;

import com.telusko.banksystem.model.Bank;
import com.telusko.banksystem.repo.BankRepo;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankService {
    @Autowired
    private BankRepo bankRepo;

    public Bank addBank(Bank bank) {
        return bankRepo.save(bank);
    }

    public List<Bank> getAllBanks() {
        return bankRepo.findAll();
    }

    public Bank getBank(int id) {
        return bankRepo.findById(id).orElse(new Bank());
    }
}
