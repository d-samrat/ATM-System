package com.atmsystem.entities;
import java.util.ArrayList;
import java.util.List;
import com.atmsystem.entities.User;
import com.atmsystem.entities.usertypes.MajorUser;
import com.atmsystem.entities.usertypes.MinorUser;
import jakarta.persistence.*;

@Entity
@Table(name="bank")
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(long id) {
        this.id = id;
    }

    private String name;
    
    @OneToMany(mappedBy = "bank")
    private List<User> users = new ArrayList<>();

    public Bank(String name){
        this.name = name;
    }

    public Bank() {
    }

    public void listOfUsers(){
        if(users.size()>1) {
            System.out.println("The list of users are: ");
            for (User user : users) {
                System.out.println(user.getName()+" "+user.getId());
            }
        }
    }

    public void addUser(User user){
        users.add(user);
    }

    public void removeUser(User user){
        users.remove(user);
    }

}
