import FileSystem from "./fileSystem";

class AudioManager {
  constructor() {
    if (!AudioManager.instance) {
      AudioManager.instance = this;

      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      // 声音配置（存默认音量）
      this.sounds = {
        startPageBgm: {
          src: "/music/Airship.ogg",
          loop: true,
          defaultVolume: 0.5,
        },
        shootVice: {
          src: "/music/ak47shoot.mp3",
          loop: false,
          defaultVolume: 0.1,
        },
      };

      // 当前音量比例（外部可调）
      this.bgmVolume = 1.0; // 背景音乐全局音量
      this.effectVolume = 1.0; // 音效全局音量
      this.currentBGM = null;
      this.muted = false;
    }
    return AudioManager.instance;
  }
  initSet() {
    const FileSys = new FileSystem();
    FileSys.handleLoad("globalSet.json", (content) => {
      const settings = JSON.parse(content);
      this.setBGMVolume(settings.globalVolume||1);
      this.setEffectVolume(settings.effectVolume||1);
    });
  }

  setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
  }
  setEffectVolume(volume) {
    this.effectVolume = Math.max(0, Math.min(1, volume));
  }
  playBGM(name) {
    if (this.currentBGM) {
      this.currentBGM.pause();
      this.currentBGM = null;
    }

    const cfg = this.sounds[name];
    if (!cfg) return;

    const audio = new Audio(cfg.src);
    audio.onerror = (e) => console.error("音频加载失败", e);
    audio.loop = cfg.loop;
    audio.volume = cfg.defaultVolume * this.bgmVolume;
    audio.muted = this.muted;
    audio.play();

    this.currentBGM = audio;
  }

  playEffect(name) {
    const cfg = this.sounds[name];
    if (!cfg) return;

    const audio = new Audio(cfg.src);
    audio.volume = cfg.defaultVolume * this.effectVolume;
    audio.muted = this.muted;
    audio.play();
  }

  setMuted(val) {
    this.muted = val;
    if (this.currentBGM) {
      this.currentBGM.muted = val;
    }
  }

  // 停止所有声音
  stopAll() {
    if (this.currentBGM) {
      this.currentBGM.pause();
      this.currentBGM = null;
    }
  }

  // 设置背景音乐音量 (0.0 - 1.0)
  setBGMVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    if (this.currentBGM) {
      const cfg = Object.values(this.sounds).find(
        (s) => s.src === this.currentBGM.src
      );
      if (cfg) {
        this.currentBGM.volume = cfg.defaultVolume * this.bgmVolume;
      }
    }
  }

  // 设置音效音量 (0.0 - 1.0)
  setEffectVolume(volume) {
    this.effectVolume = Math.max(0, Math.min(1, volume));
  }
}

const audioManager = new AudioManager();
export default audioManager;
