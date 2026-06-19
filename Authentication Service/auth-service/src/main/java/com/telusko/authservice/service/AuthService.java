package com.telusko.authservice.service;

import com.telusko.authservice.dto.AuthResponse;
import com.telusko.authservice.dto.LoginRequest;
import com.telusko.authservice.dto.RegisterRequest;
import com.telusko.authservice.feign.AccountInterface;
import com.telusko.authservice.feign.CreateAccountRequest;
import com.telusko.authservice.model.AppUser;
import com.telusko.authservice.repository.AppUserRepository;
import com.telusko.authservice.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AppUserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AccountInterface accountInterface;

    public ResponseEntity<String> register(RegisterRequest request){
        if(userRepo.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already registered");
        }

        AppUser user = new AppUser();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        user = userRepo.save(user);

        try{
            accountInterface.registerAccount(new CreateAccountRequest(request.getHolderName(), user.getId()));
        } catch (Exception e) {
            userRepo.delete(user);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Registration failed, please try again");
        }

        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> login(LoginRequest request){
        AppUser user = userRepo.findByEmail(request.getEmail())
                .orElse(null);

        if(user ==null || !passwordEncoder.matches(request.getPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());
        return ResponseEntity.ok(new AuthResponse(token));
    }

}
