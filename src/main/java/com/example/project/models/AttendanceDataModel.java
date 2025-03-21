package com.example.project.models;

import java.util.Date;

public class AttendanceDataModel {
    private Date clock_in;
    private Date clock_out;
    private Date todayDate;
    private boolean valid;

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    private TimeWorkedModel timeWorkedModel;

    public TimeWorkedModel getTimeWorkedModel() {
        return timeWorkedModel;
    }

    public void setTimeWorkedModel(TimeWorkedModel timeWorkedModel) {
        this.timeWorkedModel = timeWorkedModel;
    }

    public Date getClock_in() {
        return clock_in;
    }

    public void setClock_in(Date clock_in) {
        this.clock_in = clock_in;
    }

    public Date getClock_out() {
        return clock_out;
    }

    public void setClock_out(Date clock_out) {
        this.clock_out = clock_out;
    }

    public Date getTodayDate() {
        return todayDate;
    }

    public void setTodayDate(Date todayDate) {
        this.todayDate = todayDate;
    }
}
