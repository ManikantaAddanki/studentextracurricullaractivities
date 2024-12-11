package com.atlas.circular.controller;


import com.atlas.circular.repository.clubdb;
import com.atlas.circular.repository.userdb;
import com.atlas.circular.service.clubs;
import com.atlas.circular.service.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class Rlserver {


    Rlserver(){
        System.out.println("He;llo all server started");
    }

    @Autowired
    user user1;

    @Autowired
    userdb  userdb1;

    @Autowired
    DataSource db;

    @Autowired
    clubs club1;

    @Autowired
    clubdb clubdb1;


    @PostMapping("/register")
    public HashMap<String,Object> register(@RequestBody user usr){
        System.out.println("register got in server");
        HashMap<String,Object> json = new HashMap<>();
        userdb1.save(usr);
        json.put("status",true);
        json.put("message","registration successfull");

        return json;
    }

    @PostMapping("/login")
    public HashMap<String,Object> login(@RequestBody user usr) throws Exception {
        System.out.println("login from server");
        HashMap<String,Object> json = new HashMap<>();

        user1 = userdb1.findByUsernameAndPassword(usr.getUsername(),usr.getPassword());

        if(user1 == null){
            json.put("status",false);
            json.put("message","no user found");
        }else{
            json.put("status",true);
            json.put("message","user found");

        }


        return json;
    }

    @GetMapping("/getprofile/{uname}")
    public user getprofile(@PathVariable String uname){
        System.out.println("profile fetched     " + uname);
        return userdb1.findById(uname).orElse(new user());
    }

    @PostMapping("/joinclub/{id}/{clubname}")
    public HashMap<String,Object> addToClub(@PathVariable String id,@PathVariable String clubname){

        HashMap<String,Object> json = new HashMap<>();

        user1 = userdb1.findById(id).orElse(new user());
        user1.setClub(clubname);
        userdb1.save(user1);
        json.put("status",true);
        json.put("message","added in club " + clubname);
        return json;


    }



    @PostMapping("/addclub")
    public HashMap<String,Object> addClub(@RequestBody  clubs clb){

        HashMap<String,Object> json = new HashMap<>();

//        try {
            clubdb1.save(clb);

//        } catch (Exception e) {
//            json.put("status",false);
//            json.put("message",e);
//            return json;
//        }
        json.put("status",true);
        json.put("message","club created");

        return json;


    }



    @GetMapping("/getclubs")
    public List<clubs> getClub(){
        List<clubs> a = new ArrayList<>();
        a.addAll(clubdb1.findAll());
        return a;

    }





    @GetMapping("/")
    public List<user> home(){
        List<user> a = new ArrayList<>();

        a.addAll(userdb1.findByEmail("inrupesh.in@gmail.com"));

        return a;

    }


}
