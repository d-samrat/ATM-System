package com.telusko.banksystem.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String transactionId;
    private String transactionType;
    protected Long amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
