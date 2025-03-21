package com.example.project.controller;

import com.example.project.models.*;
import com.example.project.service.BusinessLogic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
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
    public ResponseEntity<UserLoginModel> login(@RequestBody LoginModel loginModel ) {
        System.out.println("recieved login request");
        User u = service.correctPassword(loginModel);
        UserLoginModel userLoginModel = new UserLoginModel();
        if (u == null){
        return (ResponseEntity) ResponseEntity.status(403);
        }
        Attendance attendance = service.getActiveAttendance(u);
        if(attendance == null){
        userLoginModel.setUser(u);
        userLoginModel.setSeconds(0L);
        return ResponseEntity.ok(userLoginModel);
        }
        else{
            userLoginModel.setUser(u);
            if(attendance.getClock_in() == null){
                userLoginModel.setSeconds(0L);
                userLoginModel.setClockin(false);
                return ResponseEntity.ok(userLoginModel);
            }
            Long seconds =Duration.between(attendance.getClock_in().toInstant(),new Date().toInstant()).getSeconds();
            if(attendance.getClock_out() == null){
                userLoginModel.setSeconds(seconds);
                userLoginModel.setClockin(true);
            }else {
                Long sec =Duration.between(attendance.getClock_in().toInstant(),attendance.getClock_out().toInstant()).getSeconds();
                userLoginModel.setSeconds(sec);
                userLoginModel.setClockin(false);
            }


            return ResponseEntity.ok(userLoginModel);
        }
    }

    @PostMapping("/attendance")
    public ResponseEntity<List<AttendanceDataModel>> attendanceData(@RequestBody User user ) {
        System.out.println("recieved attendance request");
       return  ResponseEntity.ok(service.getAttendanceData(user));
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
