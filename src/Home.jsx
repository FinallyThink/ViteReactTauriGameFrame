import { useNavigate } from "react-router-dom";
import { getCurrentWindow } from '@tauri-apps/api/window';
import "./Home.less";
function Home() {
  const navigate = useNavigate();
  const handleExit = async () => {
    const appWindow = await getCurrentWindow();
    await appWindow.close(); // 关闭当前窗口
    // 如果需要完全退出应用，可以使用 exit 方法
  };

  return (
    <div className="menuCon">
      <div className="buttonBox">
        <button onClick={() => navigate("/GamePage")}>开始游戏</button>
        <button onClick={() => navigate("/SetPage")}>设置</button>
        <button onClick={() => handleExit ()}>退出游戏</button>{" "}
        {/* 退出游戏关闭窗口 */}
      </div>
    </div>
  );
}

export default Home;
