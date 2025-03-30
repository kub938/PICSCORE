package com.picscore.backend.common.exception;

import com.picscore.backend.common.model.response.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<BaseResponse<Void>> handleCustomException(CustomException ex) {
        return ResponseEntity.status(ex.getStatus())
                .body(BaseResponse.error(ex.getMessage()));
    }
}
