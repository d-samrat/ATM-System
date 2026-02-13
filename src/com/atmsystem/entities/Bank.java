package com.atmsystem.entities;
import java.util.ArrayList;
import java.util.List;
import com.atmsystem.entities.User;
import com.atmsystem.entities.usertypes.MajorUser;
import com.atmsystem.entities.usertypes.MinorUser;

public class Bank {
    private String name;
    private String bankId;
    private List<User> usersList;

    public Bank(String name, String bankId){
        this.name = name;
        this.bankId = bankId;
        this.usersList = new ArrayList<User>();
    }

    public String getBankId(){
        return bankId;
    }

    public void listOfUsers(){
        if(usersList.size()>1) {
            System.out.println("The list of users are: ");
            for (User user : usersList) {
                System.out.println(user.getName()+" "+user.getId());
            }
        }
    }

    public void addUser(User user){
        usersList.add(user);
    }

    public void removeUser(User user){
        usersList.remove(user);
    }

}
