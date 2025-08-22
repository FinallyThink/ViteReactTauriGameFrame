class KeyEventManager {
  constructor() {
    if (!KeyEventManager.instance) {
      this.activeKeys = new Set(); // 当前按下的键
      this._removeEvent = null; // 保存全局监听解绑函数
      this.keyEvent = {}; // { keyCode: [持续触发回调列表] }
      this.pressEvent = {}; // { keyCode: [完整按下-抬起回调列表] }
      this.animationFrame = null;
      this._isListening = false;
      this.minRunTime = 30; // 最小触发间隔（ms）
      this._lastTriggerTime = {}; // 记录上次触发时间（节流）

      // 基础 handler (keydown)
      this._handler = (event) => {
        const callbacks = this.keyEvent[event.keyCode];
        if (callbacks) {
          callbacks.forEach((cb) => cb(event));
        }
      };

      KeyEventManager.instance = this;
    }
    return KeyEventManager.instance;
  }

  // ========= KeyDown 持续触发型（带节流） =========
  addKeyEvent(keyCode, callback) {
    if (typeof callback !== "function") return () => {};
    if (!this.keyEvent[keyCode]) {
      this.keyEvent[keyCode] = [];
    }
    this.keyEvent[keyCode].push(callback);

    if (!this._isListening) {
      window.addEventListener("keydown", this._handler);
      this._isListening = true;
    }

    // 返回解绑函数
    return () => this.removeKeyEvent(keyCode, callback);
  }

  removeKeyEvent(keyCode, callback) {
    if (!this.keyEvent[keyCode]) return;
    this.keyEvent[keyCode] = this.keyEvent[keyCode].filter((cb) => cb !== callback);
    if (this.keyEvent[keyCode].length === 0) {
      delete this.keyEvent[keyCode];
    }

    if (Object.keys(this.keyEvent).length === 0 && this._isListening) {
      window.removeEventListener("keydown", this._handler);
      this._isListening = false;
    }
  }

  clearAllEvents() {
    this.keyEvent = {};
    this.pressEvent = {};
    if (this._isListening) {
      window.removeEventListener("keydown", this._handler);
      this._isListening = false;
    }
  }

  // ========= Press 完整按下-抬起型 =========
  addPressEvent(keyCode, callback) {
    if (!this.pressEvent[keyCode]) {
      this.pressEvent[keyCode] = [];
    }
    this.pressEvent[keyCode].push(callback);

    const handleKeyDown = (event) => {
      if (event.keyCode === keyCode) {
        this.activeKeys.add(keyCode);
      }
    };

    const handleKeyUp = (event) => {
      if (event.keyCode === keyCode && this.activeKeys.has(keyCode)) {
        this.activeKeys.delete(keyCode);
        this.pressEvent[keyCode]?.forEach((cb) => cb(event));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 返回解绑函数
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      this.removePressEvent(keyCode, callback);
    };
  }

  removePressEvent(keyCode, callback) {
    if (!this.pressEvent[keyCode]) return;
    this.pressEvent[keyCode] = this.pressEvent[keyCode].filter((cb) => cb !== callback);
    if (this.pressEvent[keyCode].length === 0) {
      delete this.pressEvent[keyCode];
    }
  }

  // ========= 连续触发（节流 10ms） =========
  playerMoveHandler() {
    const now = performance.now();
    this.activeKeys.forEach((keyCode) => {
      const callbacks = this.keyEvent[keyCode];
      if (callbacks) {
        const lastTime = this._lastTriggerTime[keyCode] || 0;
        if (now - lastTime >= this.minRunTime) {
          callbacks.forEach((cb) => cb({ keyCode }));
          this._lastTriggerTime[keyCode] = now;
        }
      }
    });
    this.animationFrame = requestAnimationFrame(this.playerMoveHandler.bind(this));
  }

  // ========= 全局监听开关 =========
  listenKeyboardEvent() {
    const handleKeyDown = (event) => {
      if (!this.animationFrame) {
        this.animationFrame = requestAnimationFrame(this.playerMoveHandler.bind(this));
      }
      this.activeKeys.add(event.keyCode);
    };

    const handleKeyUp = (event) => {
      this.activeKeys.delete(event.keyCode);
      if (this.activeKeys.size === 0) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }

  activateListener() {
    this.removeEvent = this.listenKeyboardEvent();
    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(this.playerMoveHandler.bind(this));
    }
  }

  deactivateListener() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.activeKeys.clear();
    if (this.removeEvent) {
      this.removeEvent();
      this.removeEvent = null;
    }
  }
}

// 创建单例
const KeyManager = new KeyEventManager();
export default KeyManager;
