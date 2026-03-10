package com.telusko.banksystem.repo;

import com.telusko.banksystem.model.Bank;
import com.telusko.banksystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    List<User> findByBankId(int id);
    Optional<User> findByUsername(String username);
}
