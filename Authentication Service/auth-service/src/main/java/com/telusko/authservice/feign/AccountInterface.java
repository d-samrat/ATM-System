package com.telusko.authservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="account-service")
public interface AccountInterface {

    @PostMapping("/account/register")
    public String registerAccount(@RequestBody CreateAccountRequest request);
}
