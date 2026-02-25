# ATM System (Java + Hibernate)

A backend ATM management system implemented in Java using **Hibernate ORM** for database interaction. This project models a bank with users, accounts, and transactions, and provides basic banking operations like balance checks, deposits, and withdrawals.

## Project Overview

This application simulates core ATM functionalities with object-oriented design, inheritance, and persistent storage using Hibernate.

Key features include:

- User and bank relationship modeling  
- Transaction logging with multiple transaction types  
- Balance checks and updates  
- Clean service layer architecture for business logic  

This is a backend service project — you can build on it later with a CLI or UI layer.

---

## Project Structure


📦src
┣ 📂main/java/com/atmsystem
┃ ┣ 📂entities
┃ ┃ ┣ ➤ User.java (abstract base class for users)
┃ ┃ ┣ ➤ Bank.java (bank entity)
┃ ┃ ┣ ➤ Transaction.java (transaction entity)
┃ ┣ 📂service
┃ ┃ ┣ ➤ BankService.java (service layer for bank operations)
┃ ┣ ➤ Main.java (application entry point)
┣ 📜pom.xml (Maven build config)


---

## Features

- **Object-oriented design** with inheritance (`User` subclasses)  
- **Hibernate ORM** for database mapping  
- One-to-many and many-to-one relationships between users and transactions/ banks  
- Transaction tracking with different types  
- Flexible service layer for business logic  

---

## Getting Started

### Prerequisites

✔ Java 17+  
✔ Maven  
✔ PostgreSQL or any DB supported by Hibernate  
✔ Hibernate and DB driver dependencies in `pom.xml`

---
