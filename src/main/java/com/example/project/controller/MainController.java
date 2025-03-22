package com.example.project.controller;

import com.example.project.models.Attendance;
import com.example.project.models.LoginModel;
import com.example.project.models.User;
import com.example.project.service.BusinessLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
@CrossOrigin("*")
@RequestMapping("api")
@RestController
public class MainController {
    @Autowired
    BusinessLogic service;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user,
     @RequestHeader("role") String role
    ){
        User u = user;
        u.setCreatedAt(new Date());
        u.setRole(role);
        service.saveUser(u);
        return ResponseEntity.status(HttpStatus.CREATED).body(u);
    }

  @PostMapping ("/clockin")
    public ResponseEntity<String> clockIn(@RequestBody User user){
System.out.println("Recieved a clockin request ");
        return  service.clockIn(user);
    }
    @PostMapping("/clockout")
    public void clockOut(@RequestBody User user){
        service.clockout(user);
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
     return ResponseEntity.ok(service.allUsers());
    }

@PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginModel loginModel ) {
        System.out.println("recieved login request");
        User u = service.correctPassword(loginModel);
        if (u == null){
            return (ResponseEntity) ResponseEntity.status(403);
        }else{
            return ResponseEntity.ok(u);
        }
    }

    @GetMapping("/report")
    public ResponseEntity<HashMap<String, List<Attendance>>> makeReport(@RequestBody User user, @RequestHeader("role") String role) {

        if (!role.equals("HR")) {
            return ResponseEntity.status(403).body(null);
        }

        HashMap<String, List<Attendance>> map = service.getReports();
        return ResponseEntity.ok(map);
    }




}
