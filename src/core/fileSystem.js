import {
  writeTextFile,
  readTextFile,
  exists,
  mkdir,
} from "@tauri-apps/plugin-fs";
import { appConfigDir } from "@tauri-apps/api/path";

const initFilesName  = ["globalSet.json","test.json"]; // 初始化文件名

export const checkInitFile = async () => {
  const baseDir = await appConfigDir();
  for (const fileName of initFilesName) {
    const filePath = `${baseDir}/${fileName}`;
    const fileExists = await exists(filePath);
    if (!fileExists) {
      // 如果文件不存在，创建一个空文件
      await writeTextFile(filePath, "{}");
      console.log(`初始化文件 ${fileName} 已创建`);
    }
  } 
}



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
