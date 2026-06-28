# 🏦 Banking Application

A comprehensive, microservices-based banking platform with a modern React frontend and distributed Java backend services. This application demonstrates enterprise-level architecture patterns including service discovery, API gateway routing, and distributed transaction handling.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Services](#services)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

The Banking Application is a full-featured, production-ready banking platform built using a microservices architecture. It provides secure account management, user authentication, transaction processing, and comprehensive financial operations.

**Key Highlights:**
- ✅ Microservices-based distributed architecture
- ✅ React + Vite modern frontend
- ✅ Java-based backend services
- ✅ API Gateway for centralized routing
- ✅ Service registry for dynamic discovery
- ✅ Secure authentication and authorization
- ✅ Real-time transaction processing

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | Latest | UI library |
| **Vite** | Latest | Build tool & dev server |
| **JavaScript** | ES6+ | Frontend logic |
| **CSS** | Latest | Styling |
| **HTML** | 5 | Markup |

**Language Composition:** JavaScript (55.5%)

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 11+ | Backend services |
| **Spring Boot** | Latest | Microservices framework |
| **Spring Cloud** | Latest | Service discovery & config |
| **Maven/Gradle** | Latest | Build management |

**Language Composition:** Java (37.4%)

### Infrastructure
| Component | Purpose |
|-----------|---------|
| **API Gateway** | Request routing & load balancing |
| **Service Registry** | Service discovery & registration |
| **Database** | Persistent data storage |
| **Messaging** | Asynchronous communication |

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Applications                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      API Gateway                             │
│              (Request Routing & Load Balancing)             │
└──────────┬─────────────────┬──────────────────┬─────────────┘
           │                 │                  │
    ┌──────▼──────┐  ┌──────▼──────┐  ┌───────▼──────┐
    │  Account     │  │   Auth      │  │ Transaction  │
    │  Service     │  │  Service    │  │  Service     │
    │              │  │             │  │              │
    │ - Profiles   │  │ - Login     │  │ - Transfers  │
    │ - Accounts   │  │ - Tokens    │  │ - Payments   │
    │ - Balance    │  │ - Security  │  │ - History    │
    └──────┬───────┘  └──────┬──────┘  └───────┬──────┘
           │                 │                  │
    ┌──────▼─────────────────▼──────────────────▼──────┐
    │                  Service Registry                 │
    │          (Service Discovery & Registration)      │
    └──────────────────────────────────────────────────┘
           │
    ┌──────▼──────────────┐
    │     Databases       │
    │   & Data Services   │
    └─────────────────────┘
```

---

## 📁 Project Structure

```
Banking-Application/
│
├── Front-end/
│   └── greenbank-frontend/                 # React + Vite Frontend Application
│       ├── src/
│       │   ├── components/                 # React Components
│       │   ├── pages/                      # Page Components
│       │   ├── services/                   # API Services
│       │   ├── styles/                     # CSS Styling
│       │   └── App.jsx                     # Root Component
│       ├── package.json                    # Dependencies
│       ├── vite.config.js                  # Vite Configuration
│       └── README.md                       # Frontend Documentation
│
├── API Gateway/                             # API Gateway Service
│   ├── src/
│   ├── pom.xml                             # Maven Configuration
│   └── README.md                           # API Gateway Documentation
│
├── Account Service/                         # Account Management Service
│   ├── src/
│   ├── pom.xml                             # Maven Configuration
│   └── README.md                           # Service Documentation
│
├── Authentication Service/                  # Authentication & Authorization
│   ├── src/
│   ├── pom.xml                             # Maven Configuration
│   └── README.md                           # Service Documentation
│
├── Transaction Service/                     # Transaction Processing Service
│   ├── src/
│   ├── pom.xml                             # Maven Configuration
│   └── README.md                           # Service Documentation
│
├── Service Registry/                        # Eureka Service Registry
│   ├── src/
│   ├── pom.xml                             # Maven Configuration
│   └── README.md                           # Registry Documentation
│
└── README.md                                # Main Project Documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

#### Frontend Development
- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

#### Backend Development
- **Java Development Kit (JDK)** 11 or higher
- **Maven** 3.6+ or **Gradle** 7.0+
- **Git** 2.25+

#### Optional (for Database)
- **MySQL** / **PostgreSQL** / Your preferred database
- **Docker** (for containerized setup)

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/d-samrat/Banking-Application.git
cd Banking-Application
```

#### 2. Frontend Setup
```bash
cd Front-end/greenbank-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

The frontend will be available at `http://localhost:5173`

#### 3. Backend Setup

Each microservice runs independently. Start them in the following order:

##### Service Registry (Eureka)
```bash
cd Service\ Registry

# Build the service
mvn clean build

# Run the service
java -jar target/service-registry-1.0.0.jar
```

Available at: `http://localhost:8761`

##### Authentication Service
```bash
cd Authentication\ Service

mvn clean build
java -jar target/auth-service-1.0.0.jar
```

##### Account Service
```bash
cd Account\ Service

mvn clean build
java -jar target/account-service-1.0.0.jar
```

##### Transaction Service
```bash
cd Transaction\ Service

mvn clean build
java -jar target/transaction-service-1.0.0.jar
```

##### API Gateway
```bash
cd API\ Gateway

mvn clean build
java -jar target/api-gateway-1.0.0.jar
```

API Gateway available at: `http://localhost:8080`

---

## 📦 Services

### 1. **API Gateway**
The central entry point for all client requests. Routes requests to appropriate microservices.

**Responsibilities:**
- Request routing and load balancing
- Request/response transformation
- Rate limiting and throttling
- Cross-cutting concerns (logging, monitoring)

**Port:** 8080

---

### 2. **Authentication Service**
Handles user authentication, token generation, and authorization.

**Responsibilities:**
- User login and logout
- JWT token generation and validation
- User registration
- Password management
- Role-based access control (RBAC)

**Port:** 8081

**Key Endpoints:**
- `POST /auth/login` - User login
- `POST /auth/register` - New user registration
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - User logout
- `GET /auth/validate` - Validate token

---

### 3. **Account Service**
Manages user accounts and account-related operations.

**Responsibilities:**
- Account creation and management
- User profile management
- Account balance tracking
- Account statements and history
- Account settings

**Port:** 8082

**Key Endpoints:**
- `GET /accounts/{accountId}` - Get account details
- `POST /accounts` - Create new account
- `PUT /accounts/{accountId}` - Update account
- `GET /accounts/{accountId}/balance` - Get balance
- `GET /accounts/{accountId}/statements` - Get statements

---

### 4. **Transaction Service**
Processes financial transactions and transfers.

**Responsibilities:**
- Transfer processing
- Payment handling
- Transaction history
- Transaction validation
- Transaction reporting

**Port:** 8083

**Key Endpoints:**
- `POST /transactions/transfer` - Process transfer
- `GET /transactions/{transactionId}` - Get transaction details
- `GET /transactions/history/{accountId}` - Get transaction history
- `GET /transactions/statements` - Generate statements

---

### 5. **Service Registry**
Enables dynamic service discovery for microservices.

**Responsibilities:**
- Service registration
- Service discovery
- Health checks
- Load balancing support

**Port:** 8761

**Dashboard:** `http://localhost:8761`

---

## ⚙️ Installation & Setup

### Complete Setup Guide

#### Step 1: Database Configuration

Create a database for the application:

```sql
CREATE DATABASE banking_app;
CREATE USER 'bank_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON banking_app.* TO 'bank_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Step 2: Environment Variables

Create `.env` files for each service:

**Frontend (.env)**
```
VITE_API_URL=http://localhost:8080
VITE_AUTH_SERVICE=http://localhost:8081
```

**Backend Services (application.properties)**
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/banking_app
spring.datasource.username=bank_user
spring.datasource.password=secure_password

# Service Registry
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Server
server.port=8081  # Change per service
```

#### Step 3: Build & Run

```bash
# Frontend
cd Front-end/greenbank-frontend
npm install && npm run dev

# Backend Services (in separate terminals)
cd Service\ Registry && mvn spring-boot:run
cd Authentication\ Service && mvn spring-boot:run
cd Account\ Service && mvn spring-boot:run
cd Transaction\ Service && mvn spring-boot:run
cd API\ Gateway && mvn spring-boot:run
```

---

## 🔧 Configuration

### Frontend Configuration

**vite.config.js**
```javascript
export default {
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
}
```

### Backend Configuration

**application.yml (for Spring Boot services)**
```yaml
spring:
  application:
    name: auth-service
  datasource:
    url: jdbc:mysql://localhost:3306/banking_app
    username: bank_user
    password: secure_password
  jpa:
    hibernate:
      ddl-auto: update

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    prefer-ip-address: true

server:
  port: 8081
```

---

## 📚 API Documentation

### Authentication Endpoints

**Login**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 3600
}
```

### Account Endpoints

**Get Account Details**
```http
GET /accounts/ACC123456
Authorization: Bearer {token}
```

**Get Account Balance**
```http
GET /accounts/ACC123456/balance
Authorization: Bearer {token}
```

### Transaction Endpoints

**Transfer Money**
```http
POST /transactions/transfer
Authorization: Bearer {token}
Content-Type: application/json

{
  "fromAccountId": "ACC123456",
  "toAccountId": "ACC789012",
  "amount": 100.00,
  "description": "Payment for services"
}
```

---

## ✨ Features

### Current Features
- ✅ User Registration & Login
- ✅ Account Management
- ✅ Balance Inquiry
- ✅ Fund Transfer
- ✅ Transaction History
- ✅ Statement Generation
- ✅ User Profile Management
- ✅ JWT-based Authentication

### Planned Features (Roadmap)
- 🔄 Multi-currency Support
- 🔄 Scheduled Payments
- 🔄 Bill Payment Integration
- 🔄 Mobile App
- 🔄 Advanced Analytics & Reports
- 🔄 Loan Management
- 🔄 Investment Services
- 🔄 Notification System (SMS/Email)
- 🔄 Two-Factor Authentication (2FA)
- 🔄 Audit Logging & Compliance

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Coding Standards

- Follow the existing code style
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation for new features
- Write tests for new functionality

### Report Issues

Found a bug? Please create an issue with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

```
MIT License

Copyright (c) 2026 d-samrat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 💬 Support

For support, reach out through:

- **GitHub Issues:** [Create an Issue](https://github.com/d-samrat/Banking-Application/issues)
- **Email:** Contact repository owner
- **Documentation:** Check individual service README files

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Primary Language** | JavaScript (55.5%) |
| **Backend Language** | Java (37.4%) |
| **Styling** | CSS (6.6%), HTML (0.5%) |
| **Repository Size** | ~30 MB |
| **Created** | February 13, 2026 |
| **Last Updated** | June 28, 2026 |

---

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Microservices Patterns](https://microservices.io/patterns/index.html)
- [JWT Authentication](https://jwt.io/)

---

## 👨‍💻 Author

**d-samrat**
- GitHub: [@d-samrat](https://github.com/d-samrat)
- Repository: [Banking-Application](https://github.com/d-samrat/Banking-Application)

---

## 🙏 Acknowledgments

- Spring Boot Community
- React Community
- Open source contributors
- Everyone who provided feedback and suggestions

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star! ⭐**

Made with ❤️ by d-samrat

</div>
