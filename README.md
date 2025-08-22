# 🎮 React + Vite + Tauri 架构设计方案

## 一、目录结构

```text
project-root/
│
├─ public/                       # 静态资源（不打包，直接可访问）
│   ├─ images/
│   ├─ audio/
│   ├─ video/
│
├─ src/
│   ├─ assets/                   # 打包后的静态资源（vite 内部引用）
│   │   ├─ sprites/
│   │   ├─ sounds/
│   │   ├─ fonts/
│   │
│   ├─ data/                     # 游戏数据（配置）
│   │   ├─ monsters.json
│   │   ├─ items.json
│   │   ├─ levels.json
│   │
│   ├─ scripts/                  # 怪物、关卡逻辑脚本
│   │   ├─ monster/
│   │   │   ├─ goblin.js
│   │   │   ├─ dragon.js
│   │   ├─ ai/
│   │   │   ├─ pathFinding.js
│   │
│   ├─ core/                     # 全局核心模块
│   │   ├─ globalState.js        # 全局数据处理
│   │   ├─ eventBus.js           # 游戏事件中心
│   │   ├─ keyboard.js           # 键盘事件管理
│   │   ├─ AudoManager.js              # 音频处理
│   │   ├─ video.js              # 视频处理
│   │   ├─ fileSystem.js         # 文件读写（Tauri fs API）
│   │   ├─ router.js             # 路由封装
│   │
│   ├─ components/               # React UI 组件
│   │   ├─ layout/
│   │   ├─ ui/
│   │   ├─ game/ 
│   │
│   ├─ pages/                    # 页面级组件（路由页面）
│   │   ├─ Home.jsx
│   │   ├─ Game.jsx
│   │   ├─ Settings.jsx
│   │
│   ├─ App.jsx
│   ├─ main.jsx
│
├─ src-tauri/                    # Tauri 后端
│   ├─ src/
│   │   ├─ main.rs               # Tauri 主入口
│   │   ├─ commands.rs           # 自定义 Rust 命令
│
├─ package.json
├─ vite.config.js
```

## 二、基本模块设计

### 1. 全局数据处理模块
- 管理全局状态（玩家数据、关卡信息、怪物状态等）
- 支持存档加载、保存
- 可选方案：**Redux Toolkit** 或 **Zustand**

---

### 2. 音频处理模块
- 基于 **Web Audio API**
- 支持背景音乐、音效并发播放、音量控制

---

### 3. 视频处理模块
- 基于 `<video>` 或 `canvas`
- 用于播放过场动画、特效
- 提供播放、暂停、跳转 API

---

### 4. 路由处理模块
- 基于 **react-router-dom**
- 页面：`Home`、`Game`、`Settings`
- 提供统一导航封装

---

### 5. 文件写入读取处理模块
- 封装 Tauri **fs API**
- 用于存档保存、读取配置
- JSON 作为主要数据格式

---

### 6. 游戏事件处理模块
- 采用 **发布/订阅模式 (EventBus)**
- 用于解耦各个系统（如怪物 AI、玩家控制、战斗逻辑）

---

### 7. 键盘事件处理模块
- 统一监听键盘事件
- 通过事件总线分发
- 便于玩家输入与游戏逻辑分离

---

## 三、交互流程

1. **启动游戏**  
   - 加载配置 → 初始化全局数据  

2. **页面路由**  
   - Home → Game → Settings  

3. **事件驱动**  
   - 怪物脚本通过 `eventBus` 与核心模块交互  

4. **数据保存**  
   - 通过 `fileSystem` 写入存档  

5. **多媒体播放**  
   - 音频：`audioManager`  
   - 视频：`video` 模块  

---
