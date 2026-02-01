import {
  writeTextFile,
  readTextFile,
  exists,
  mkdir,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

const initFilesName = ["globalSet.json", "test.json"];

export async function ensureInitFiles() {
  const dir = "data";
  const baseDir = BaseDirectory.AppConfig;

  const dirExists = await exists(dir, { baseDir });
  if (!dirExists) {
    await mkdir(dir, { baseDir, recursive: true });
  }

  for (const fileName of initFilesName) {
    const relPath = `${dir}/${fileName}`;
    const ok = await exists(relPath, { baseDir });
    if (!ok) {
      await writeTextFile(relPath, "{}", { baseDir });
    }
  }

  return { dir, baseDir };
}

export default class FileSystem {
  constructor() {
    this.dir = "data";
    this.baseDir = BaseDirectory.AppConfig;
    console.log(this.baseDir);// 13
    this._initPromise = null;
  }

  init() {
    if (this._initPromise) return this._initPromise;
    this._initPromise = (async () => {
      await ensureInitFiles();
    })();
    return this._initPromise;
  }

  async handleSave(file, data) {
    await this.init();
    const relPath = `${this.dir}/${file}`;
    await writeTextFile(relPath, data, { baseDir: this.baseDir });
  }

  async handleLoad(file, callback) {
    await this.init();
    const relPath = `${this.dir}/${file}`;
    const content = await readTextFile(relPath, { baseDir: this.baseDir });
    callback(content);
  }

  async readJson(file, fallback = {}) {
    await this.init();
    const relPath = `${this.dir}/${file}`;
    const ok = await exists(relPath, { baseDir: this.baseDir });
    if (!ok) return fallback;
    const text = await readTextFile(relPath, { baseDir: this.baseDir });
    try {
      return JSON.parse(text);
    } catch {
      return fallback;
    }
  }

  async writeJson(file, obj) {
    await this.init();
    const relPath = `${this.dir}/${file}`;
    await writeTextFile(relPath, JSON.stringify(obj, null, 2), {
      baseDir: this.baseDir,
    });
  }
}
