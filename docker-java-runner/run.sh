#!/bin/bash

# Save input to file
echo "$CODE" > Main.java

# Try compiling
javac Main.java 2> compile_error.txt
if [ $? -ne 0 ]; then
  cat compile_error.txt
  exit 1
fi

# Run the compiled class
timeout 5 java Main
