package com.ssafy.jobtender.controller;

import com.ssafy.jobtender.dto.input.KeywordInputDTO;
import com.ssafy.jobtender.dto.input.UpdateUserDTO;
import com.ssafy.jobtender.dto.output.UserOutDTO;
import com.ssafy.jobtender.service.InputService;
import com.ssafy.jobtender.service.ResultService;
import com.ssafy.jobtender.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final InputService inputService;
    private final ResultService resultService;

    @Autowired
    public UserController(UserService userService, InputService inputService, ResultService resultService) {
        this.userService = userService;
        this.inputService = inputService;
        this.resultService = resultService;
    }
    
    @PostMapping("/keyword")
    public ResponseEntity<Void> createInputsKeyword(@RequestBody KeywordInputDTO keywordInputDTO){
        List<String> userKeyWord = keywordInputDTO.getKeyWords();
        if(!userKeyWord.isEmpty()){
            resultService.createResult();
            inputService.createInputsKeyword(userKeyWord);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    }

    @GetMapping("/info")
    public ResponseEntity<UserOutDTO> readUsersByUserId(@RequestParam("userId") String userId) {
        UserOutDTO userOutDTO = this.userService.readUsersByUserId(Long.parseLong(userId));
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTO);
    }

    @PutMapping("/info")
    public ResponseEntity<UserOutDTO> updateUserByUserId(@RequestBody UpdateUserDTO updateUserDTO){
        UserOutDTO userOutDTO = this.userService.updateUsersByUserId(updateUserDTO);
        return ResponseEntity.status(HttpStatus.OK).body(userOutDTO);
    }

    @DeleteMapping("/info")
    public ResponseEntity<Boolean> deleteUserByUserId(@RequestParam("userId") String userId){
        return ResponseEntity.status(HttpStatus.OK).body(this.userService.deleteUserByUserId(Long.parseLong(userId)));
    }
}

