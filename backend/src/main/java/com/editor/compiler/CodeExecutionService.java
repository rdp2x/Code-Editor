package com.editor.compiler;

import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;

@Service
public class CodeExecutionService {

    public String executeCode(String code) {
        File tempJavaFile = null;

        try {
            // 1. Extract class name from code
            String className = extractClassName(code);

            // 2. Create temp file with className
            tempJavaFile = new File("/tmp/" + className + ".java");
            Files.write(tempJavaFile.toPath(), code.getBytes());

            // 3. Build Docker command
            List<String> command = Arrays.asList(
                    "docker", "run", "--rm",
                    "-v", "/tmp:/app", // Mount temp dir
                    "-w", "/app",      // Set working directory
                    "openjdk:17",      // Docker image
                    "bash", "-c", "javac " + className + ".java && java " + className
            );

            // 4. Start process
            ProcessBuilder builder = new ProcessBuilder(command);
            Process process = builder.start();

            // 5. Read stdout
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // 6. Read stderr
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            while ((line = errorReader.readLine()) != null) {
                output.append(line).append("\n");
            }

            process.waitFor();

            return output.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();

        } finally {
            // 7. Clean up
            if (tempJavaFile != null && tempJavaFile.exists()) {
                tempJavaFile.delete(); // poof! gone.
            }
        }
    }

    private String extractClassName(String code) throws Exception {
        for (String line : code.split("\n")) {
            line = line.trim();
            if (line.startsWith("public class")) {
                String[] parts = line.split("\\s+");
                if (parts.length >= 3) {
                    return parts[2].replace("{", "").trim(); // handle: `public class Hello {`
                }
            }
        }
        throw new Exception("No public class found in code.");
    }
}
