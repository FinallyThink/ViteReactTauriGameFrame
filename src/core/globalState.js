
class GlobalState {
  constructor() {
    if (!GlobalState.instance) {
      this.runTime = 0; //运行时间
      this.score = 0; //分数
      this.GameObjects = []; //游戏对象
      this.isGameOver = false; //游戏是否结束
      this.isPause = false; //游戏是否暂停
      this.rate =  12; //游戏刷新率，默认60FPS
      GlobalState.instance = this;
      return GlobalState.instance;
    }
  }
  //将运行世界转换为小时/分钟/秒格式
  formatRunTime() {
    let runTime = Math.floor(this.runTime /1000);
   // console.log("runTime",this.runTime);
    const hours = Math.floor(runTime / 3600);
    const minutes = Math.floor((runTime % 3600) / 60);
    const seconds = runTime % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  addrunTime(seconds) {       
    this.runTime += seconds;
  }
  reset(){
    this.runTime = 0; //运行时间
    this.score = 0; //分数
    this.GameObjects = []; //游戏对象
    this.isGameOver = false; //游戏是否结束
    this.isPause = false; //游戏是否暂停
  }
}

const GloData = new GlobalState();   
export default GloData;