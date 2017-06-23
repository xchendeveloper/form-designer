package com.suppercoder.java.formdesigner.common.model;

/**
 * Created by chenxing on 2017/1/19.
 */
public class ResultMessage {

    private int status;
    private String message;
    private Object object;

    public ResultMessage(){};

    public ResultMessage(int status){
        this.status = status;
    };
    public ResultMessage(int status, String message){
        this.status = status;
        this.message = message;
    };
    public ResultMessage(int status, String message, Object object){
        this.status = status;
        this.message = message;
        this.object = object;
    };

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
