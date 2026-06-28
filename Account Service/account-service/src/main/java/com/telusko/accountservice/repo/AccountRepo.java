package com.telusko.accountservice.repo;

import com.telusko.accountservice.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {

    Account findByAccountNo(long accountNo);
    Account findByAuthId(long authId);
}
