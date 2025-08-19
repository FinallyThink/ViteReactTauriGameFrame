import React, { useState } from "react";
import FileSystem from "./core/fileSystem";

export default function App() {
  const [text, setText] = useState("");         // 输入内容
  const [fileContent, setFileContent] = useState(""); // 读取内容
  const fileSystem = new FileSystem();         // 文件系统实例

  const handleSave = () => {
    fileSystem.handleSave("test.txt", text); // 保存到子目录
  };
  const handleLoad = () => {
    fileSystem.handleLoad("test.txt", (content) => {
      setFileContent(content);
    }); // 从子目录读取
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Tauri 文件读写示例（子目录方式）</h1>

      <textarea
        rows={6}
        style={{ width: "100%", marginBottom: "10px" }}
        placeholder="输入要保存的内容"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <button onClick={handleSave} style={{ marginRight: "10px" }}>
        保存
      </button>
      <button onClick={handleLoad}>读取</button>

      <div style={{ marginTop: "20px" }}>
        <h3>读取到的内容:</h3>
        <pre>{fileContent}</pre>
      </div>
    </div>
  );
}
