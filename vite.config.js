// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 设置启动端口
    strictPort: true, // 如果端口被占用则直接报错，而不是自动换端口
  },
  optimizeDeps: {
    include: ["@tauri-apps/api"],
  },
  hmr: {
    protocol: "ws",
    host: "localhost",
    port: 5173,
  },
});
