package com.editor.compiler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CodeExecutionController {

    @Autowired
    private CodeExecutionService codeExecutionService;

    @CrossOrigin(origins = "http://localhost:3000") // Or "*" for now
//    @PostMapping("/api/execute")
    @PostMapping("/execute")
    public CodeResponse executeCode(@RequestBody CodeRequest codeRequest) {
        String output = codeExecutionService.executeCode(codeRequest.getCode());
        return new CodeResponse(output);
    }
}
