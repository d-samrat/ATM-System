package com.telusko.banksystem.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;



@Entity(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private Long balance;

    @ManyToOne
    @JoinColumn(name="bank_id")
    private Bank bank;

    private String accountType;

}
