package com.project.baggu.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BaseException extends RuntimeException {
  private BaseResponseStatus status;
  private String message;
  public BaseException(BaseResponseStatus status){
    this.status=status;
    this.message=null;
  }

    @Override
    public String getMessage(){
      if(message==null){
        System.out.println(status.getStatus());
        return status.getMessage();
      }else{
        return String.format("%s. %s ", status.getMessage(),message);
      }
    }




}

