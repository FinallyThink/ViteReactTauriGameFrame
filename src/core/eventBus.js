//eventBus.js
// eventBus.js
class EventBus {
  constructor() {
    this.events = new Map(); // 存储事件 => 回调数组
  }

  // 注册事件
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set()); // 用 Set 防止重复
    }
    this.events.get(eventName).add(callback);

    // 返回一个 off 方法，便于随时注销
    return () => this.off(eventName, callback);
  }

  // 触发事件
  emit(eventName, ...args) {
    if (this.events.has(eventName)) {
      for (const callback of this.events.get(eventName)) {
        try {
          callback(...args);
        } catch (e) {
          console.error(`Error in event "${eventName}" callback:`, e);
        }
      }
    }
  }

  // 删除某个事件的某个回调
  off(eventName, callback) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).delete(callback);

      // 如果事件下没有回调了，就移除整个事件
      if (this.events.get(eventName).size === 0) {
        this.events.delete(eventName);
      }
    }
  }

  // 删除整个事件及所有回调
  offAll(eventName) {
    this.events.delete(eventName);
  }

  // 清空所有事件
  clear() {
    this.events.clear();
  }
}

const eventBus = new EventBus();
export default eventBus;
