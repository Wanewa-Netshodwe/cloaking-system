package com.example.project.service;

import com.example.project.models.Attendance;
import com.example.project.models.LoginModel;
import com.example.project.models.TimeWorked;
import com.example.project.models.User;
import com.example.project.repos.AttendanceRepository;
import com.example.project.repos.TimeWorkedRepository;
import com.example.project.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;

@Service
public class BusinessLogic {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private TimeWorkedRepository timeWorkRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User correctPassword(LoginModel login ){
        Optional<User> u = userRepository.findByStudentNumberAndPassword(login.getStudentNum(), login.getPassword());
        if (u.isPresent()) {
            User existingUser = u.get();
            return  existingUser;
        }else{
            return  null;
        }
    }
    public HashMap<String, List<Attendance>> getReports() {
        List<User> users = userRepository.findAll();
        List<Attendance> attendance = attendanceRepository.findAll();
        HashMap<String, List<Attendance>> userMap = new HashMap<>();

        for (User u : users) {
            System.out.println(u);
            List<Attendance> alist = new ArrayList<>();
            for (Attendance a : attendance) {
                if (a.getUser_id().getId().equals(u.getId())) {
                    alist.add(a);
                }
            }
            userMap.put(u.getFullName() + " " + u.getSurname(), alist);
        }

        return userMap;
    }


    public List<User> allUsers(){
        return  userRepository.findAll();
    }
    public void createSaveAttendance( User existingUser){
        Date now = new Date();

        TimeWorked timeWorked = new TimeWorked();
        timeWorked.setHours(0L);
        timeWorked.setMinutes(0L);
        timeWorked.setSeconds(0L);
        timeWorked.setUser_id(existingUser);
        System.out.println(timeWorked.getHours());
        System.out.println(timeWorked.getUser_id().getFullName());
        System.out.println(timeWorked.getMinutes());
        System.out.println(timeWorked.getMinutes());
        timeWorkRepository.save(timeWorked);

        Attendance attendance1 = new Attendance();

        attendance1.setTodayDate(now);
        attendance1.setClock_in(now);
        attendance1.setUser_id(existingUser);
        attendance1.setWorkHours(timeWorked);

        attendanceRepository.save(attendance1);
    }

    public ResponseEntity<String> clockIn(User user) {

        Optional<User> usr = userRepository.findByStudentNumberAndPassword(user.getStudentNumber(), user.getPassword());

        if(usr.isPresent()){
            User existingUser = usr.get();
            Optional<Attendance> attendance = attendanceRepository.findByUserIdAndToday(existingUser.getId());
            if (attendance.isPresent()) {
                if(Duration.between(attendance.get().getTodayDate().toInstant(),new Date().toInstant()).toHours() <=12){
                    System.out.println("A Day is not passed");
                    return ResponseEntity.status(403).build();
                }else{
                    System.out.println("A Day is has creating a  new one ");
                    createSaveAttendance(existingUser);
                    return ResponseEntity.ok("Clock-in successful for user: " + existingUser.getFullName());
                }
            }else{
                System.out.println("no attendance found creating one  ");
                createSaveAttendance(existingUser);
                return ResponseEntity.ok("Clock-in successful for user: " + existingUser.getFullName());
            }
        }
        else {
            System.out.println("cound find student  ");
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");

        }

    }
    public ResponseEntity<String> clockout(User user) {
        Optional<User> u = userRepository.findByStudentNumberAndPassword(user.getStudentNumber(),user.getPassword());
        if (u.isPresent()) {
            User existingUser = u.get();

            Date now = new Date();
            Optional<Attendance> attendance = attendanceRepository.findByUserIdAndToday(existingUser.getId());

            if(attendance.isPresent()){
                Attendance attendance1 = attendance.get();
                if(attendance1.getClock_out() != null){
                    return ResponseEntity.ok("Clock-out successful for user: " + existingUser.getFullName());
                }else{
                    Duration duration = Duration.between(attendance1.getClock_in().toInstant(), now.toInstant());

                    Long hours_worked =  duration.toHours();
                    Long minutes_worked =  duration.toMinutes();
                    Long seconds_worked =  duration.toSeconds();


                    TimeWorked timeWorked =  attendance1.getWorkHours();
                    timeWorked.setHours(hours_worked);
                    timeWorked.setMinutes(minutes_worked);
                    timeWorked.setSeconds(seconds_worked);

                    timeWorkRepository.save(timeWorked);

                    attendance1.setWorkHours(timeWorked);
                    attendance1.setClock_out(now);
                    attendanceRepository.save(attendance1);
                }

            }
            return ResponseEntity.ok("Clock-out successful for user: " + existingUser.getFullName());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }
    }
}
