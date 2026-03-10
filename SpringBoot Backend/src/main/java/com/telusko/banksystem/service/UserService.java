package com.telusko.banksystem.service;

import com.telusko.banksystem.model.Bank;
import com.telusko.banksystem.model.User;
import com.telusko.banksystem.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    public List<User> getAllUsersByBankId(int bankId) {
        return userRepo.findByBankId(bankId);
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public User getUserById(int id) {
        return userRepo.findById(id).orElse(new User());
    }

    public User depositAmt(int id, Long amount) {
        User user = userRepo.findById(id).orElse(new User());
        user.setBalance(user.getBalance()+amount);
        return userRepo.save(user);
    }

    public Long getBalance(int id) {
       return userRepo.findById(id).orElse(new User()).getBalance();
    }

    public User findByUsername(String username){
        return userRepo.findByUsername(username).orElse(new User());
    }
}
