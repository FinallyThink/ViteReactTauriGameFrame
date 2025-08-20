// src/router.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routes from "./core/router"; // 引入路由配置

export default function RouterPage() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>⏳ 页面加载中...</div>}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
