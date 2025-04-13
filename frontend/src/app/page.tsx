"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import NavigationBar from "@/components/navigation-bar";
import { Editor } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { Console } from "@/components/console";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [code, setCode] = useState("");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const consoleRef = useRef<React.ElementRef<typeof Console>>(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editor;
  };

  const runCode = async () => {
    if (!code.trim()) return;

    consoleRef.current?.clear(); // Clear previous output

    try {
      const response = await fetch("http://localhost:8080/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // Sending code to backend
      });

      const data = await response.json(); // Getting back output

      if (data.output) {
        consoleRef.current?.log(data.output); // Log output if available
      }
      if (data.error) {
        consoleRef.current?.error(data.error); // Log error if any
      }
    } catch (err: any) {
      consoleRef.current?.error("Failed to execute code: " + err.message);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className={`flex flex-col h-full ${isDarkMode ? "dark" : ""}`}>
        <NavigationBar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onRunCode={runCode}
        />
        <div className="flex-grow flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="flex-grow">
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={70} minSize={30}>
                  <Editor
                    height="100%"
                    defaultLanguage="java"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    onMount={handleEditorDidMount}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      tabSize: 4,
                      insertSpaces: true,
                      autoIndent: "full",
                      formatOnPaste: true,
                      formatOnType: true,
                      theme: isDarkMode ? "vs-dark" : "vs-light",
                    }}
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                  <Console
                    ref={consoleRef}
                    isDarkMode={isDarkMode}
                    onInputSubmit={() => {}}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default Page;
