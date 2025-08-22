import React, { useState,useEffect } from "react";
import "./Set.less"; // Assuming you have a Set.less for styles
import { useNavigate } from "react-router-dom";
import FileSystem from "../core/fileSystem";

function SetCom() {
  const navigate = useNavigate();

  const initSetJson = {
    globalVolume: 0.5,
    effectVolume: 0.5,
  }

  const [setJson, setSetJson] = useState(initSetJson);
  


  useEffect(() => {
    // 从文件系统加载设置
    const loadSettings = async () => {    
      try {
        const FileSys = new FileSystem();
        const settings = await FileSys.handleLoad("globalSet.json",handleLoad); 
      } catch (error) {
          console.error("加载设置失败", error);
        }
      };
      loadSettings();
    }, []);

  const handleLoad = (content) => {
    const settings = JSON.parse(content);
    setSetJson((prev)=>{
      return {
        ...prev,
        ...settings
      } 
    });
    //console.log(settings);
  }
  // 保存设置（你可以改成保存到 localStorage 或发给后端）
  const handleSave = () => {
    navigate(-1)
  };
  const setOnchange = (key, value) => {
    setSetJson((prev) => ({
      ...prev,
      [key]: value,
    }));
    const FileSys = new FileSystem();
    FileSys.handleSave("globalSet.json", JSON.stringify({ ...setJson, [key]: value }, null, 2))
  }
  return (
    <div className="setPage" id="setPage" style={{ padding: "20px" }}>
      <h2>设置页面</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>全局音量: {Math.round(setJson.globalVolume * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={setJson.globalVolume}
          onChange={(e) => setOnchange("globalVolume", parseFloat(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>特效音量: {Math.round(setJson.effectVolume * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={setJson.effectVolume}
          onChange={(e) => setOnchange("effectVolume", parseFloat(e.target.value))}
        />
      </div>

      <button onClick={handleSave}>返回</button>

      <button onClick={()=>{
        setSetJson(initSetJson);
        const FileSys = new FileSystem();
        FileSys.handleSave("globalSet.json", JSON.stringify(initSetJson, null, 2))
      }}>  恢复默认</button>
    </div>
  );
}

export default SetCom;
