(function(ns){
  ns.MainScene = tm.createClass({
    superClass: tm.app.Scene,

    /* シーンの初期化 */
    init: function(){
      this.superInit();
      userData.score = 0; // スコアを初期化
      this.ballNum = 0; // 敵の数
      this.BALL_MAX = 10; //敵の最大数

      /* ボールを生成 */
      this.ballGroup = null;
      this.ballGroup = tm.app.CanvasElement();
      this.addChild(this.ballGroup);
      var self = this;
      this.ballGroup.update = function(app){
        if(app.frame % 30 == 0 && self.ballNum < self.BALL_MAX){
          console.log(0);
          var ball = Ball();
          this.addChild( ball );
          ++self.ballNum;
        }
      }

      console.log("main");
    },

    /* シーンの更新 */
    update: function(){
      // 画面クリックでシーン切り替え
      /*
      console.log(this.chara.x, this.chara.y, app.pointing.x, app.pointing.y)
      if ( this.chara.isHitPoint(app.pointing.x, app.pointing.y) == true){
        console.log("Hit");
        this.addChild( tm.fade.FadeOut(
            app.width, app.height, "#000", 1000, function(){
              app.replaceScene(EndScene());
            })
        );
      }
      */

    },

    /* ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時 */
    onblur: function(){
      //app.pushScene(PauseScene(this.bgm));
    }
  });
})(window);

/*
 * ボール
 */
var Ball = tm.createClass({
  superClass: tm.app.CanvasElement,

  init: function(){
    this.width = this.height = Math.rand(20, 40);
    this.superInit(this.width, this.height);

    this.x = Math.rand(this.width, SCREEN_WIDTH-this.width);
    this.y = Math.rand(this.height, SCREEN_HEIGHT-this.height);
    this.y = 0;

    this.fillStyle = "#FFFFFF";
    this.radius = this.width;

    this.type = 0;  // 挙動タイプ
    this.speed = {
      "x": Math.rand(5,20),
      "y": Math.rand(5,20)
    };
    this.timer = 0;
  },

  update: function(){
    ++this.timer;
    this.move();
  },

  draw: function(c){
    c.fillCircle(0, 0, this.radius);
    c.strokeStyle = "white";
    c.lineWidth = 2;
    c.strokeCircle(0, 0, this.radius+1);
  },

  move: function(){
    this.x += this.speed.x;
    this.y += this.speed.y;


    if(this.x < 0 || this.x > SCREEN_WIDTH){ this.speed.x*=-1; }
    if(this.y < 0 || this.y > SCREEN_HEIGHT){ this.speed.y*=-1; }

  }
})