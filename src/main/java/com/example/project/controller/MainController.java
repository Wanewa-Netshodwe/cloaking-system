package com.example.project.controller;

import com.example.project.models.Attendance;
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

  @GetMapping("/clockin")
    public void clockIn(@RequestBody User user){

        service.clockIn(user);
    }
    @GetMapping("/clockout")
    public void clockOut(@RequestBody User user){
        service.clockout(user);
    }
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
     return ResponseEntity.ok(service.allUsers());
    }

@PostMapping("/login")
    public ResponseEntity login(@RequestBody User user ) {
        User u = service.correctPassword(user);
        if (u == null){
            return (ResponseEntity) ResponseEntity.status(403);
        }else{
            return ResponseEntity.ok(user);
        }
    }

    @GetMapping("/report")
    public ResponseEntity<HashMap<String, List<Attendance>>> makeReport(@RequestBody User user) {
        User u = service.correctPassword(user);
        System.out.println(u.getFullName());
        if (u == null){
            return ResponseEntity.status(403).body(null);
        }
        if (!u.getRole().equals("HR")) {
            return ResponseEntity.status(403).body(null);
        }

        HashMap<String, List<Attendance>> map = service.getReports();
        return ResponseEntity.ok(map);
    }




}
