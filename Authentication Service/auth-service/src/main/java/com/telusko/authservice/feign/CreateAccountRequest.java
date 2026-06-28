package com.telusko.authservice.feign;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateAccountRequest {
    private String holderName;
    private long authId;
}
