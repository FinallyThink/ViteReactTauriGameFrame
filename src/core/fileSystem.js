import {
  writeTextFile,
  readTextFile,
  exists,
  mkdir,
} from "@tauri-apps/plugin-fs";
import { appConfigDir } from "@tauri-apps/api/path";

export default class FileSystem {
  constructor() {
    this.baseDir = null;
    this.testFile = "test.txt"; // 文件名
    this.onCreate();
    this.isInit = false;
  }
  async onCreate() {
    this.baseDir = await appConfigDir();
    try {
      const folderExists = await exists(this.baseDir);
      if (!folderExists) {
        await mkdir(folderPath, { recursive: true });
      }
      this.isInit = true;
    } catch (e) {
      console.error("初始化失败", e);
    }
  }

  async handleSave(file, data) {
    if (!this.isInit) await this.onCreate();
    const filePath = `${this.baseDir}/${file}`;
    try {
      await writeTextFile(filePath, data);
      console.log("保存成功！");
    } catch (e) {
      console.error("保存失败", e);
    }
  }

  async handleLoad(file, callback) {
    if (!this.isInit) await this.onCreate();
    const filePath = `${this.baseDir}/${file}`;
    try {
      const content = await readTextFile(filePath);
      callback(content);
    } catch (e) {
      console.error("读取失败", e);
    }
  }
}
