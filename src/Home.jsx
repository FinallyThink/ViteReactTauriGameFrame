import { useNavigate } from "react-router-dom";
import "./Home.less"
function Home() {
  const navigate = useNavigate();
  return (
    <div className="menuCon">
      <div className="buttonBox">
        <button onClick={() => navigate("/GamePage")}>开始游戏</button>
        <button onClick={() => navigate("/SetPage")}>设置</button>
        <button onClick={() => window.close()}>退出游戏</button>{" "}
        {/* 退出游戏关闭窗口 */}
      </div>
    </div>
  );
}

export default Home;
