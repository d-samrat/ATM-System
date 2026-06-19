package com.telusko.accountservice.model;

import lombok.Data;

@Data
public class CreateAccountRequest {
    private String holderName;
    private long authId;
}
