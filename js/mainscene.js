(function(ns){
  ns.MainScene = tm.createClass({
    superClass: tm.app.Scene,

    /* シーンの初期化 */
    init: function(){
      this.superInit();
      userData.score = 0; // スコアを初期化
      this.ballNum = 0; // 敵の数
      this.BALL_MAX = 10; //敵の最大数

      /* 自機のラインを生成 */
      this.line = Line();   // 自機を生成
      this.addChild(this.line);  // 自機をシーンに追加

      /* ボールを生成 */
      this.ballGroup = null;
      this.ballGroup = tm.app.CanvasElement();
      this.addChild(this.ballGroup);
      var self = this;
      this.ballGroup.update = function(app){
        if(app.frame % 30 == 0 && self.ballNum < self.BALL_MAX){
          var ball = Ball();
          this.addChild( ball );
          ++self.ballNum;
        }
      }

      console.log("main");
    },

    /* シーンの更新 */
    update: function(){
      // ラインとボールの判定
      var hitCount = 0;
      if(app.pointing.getPointingStart()){
        this.line.color = "red";
        this.line.colorTimer = 5;
        for(var i = 0; i < this.ballGroup.children.length; ++i){
          var ball = this.ballGroup.children[i];
          if( this.isHitLineToBall(this.line, ball) ){
            console.log("ball hit");
            ball.remove();
            --this.ballNum;
            ++userData.score;
            ++hitCount;
          }
        }
        if(hitCount == 0){
          this.addChild( tm.fade.FadeOut(
              app.width, app.height, "#000", 1000, function(){
                app.replaceScene(EndScene());
              })
          );
        }
      }
    },

    /* ラインとボールの衝突判定 */
    isHitLineToBall: function(val1, val2){
      if(val2.y > (val1.y-(val1.height/2)) && val2.y < (val1.y+(val1.height/2))){
        return true;
      }
      return false;
    },

    /* ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時 */
    onblur: function(){
      //app.pushScene(PauseScene(this.bgm));
    }
  });
})(window);

/*
 * ライン
 */
var Line = tm.createClass({
  superClass:tm.app.CanvasElement,

  init:function () {
    this.superInit();
    this.width = SCREEN_WIDTH;
    this.height = 60;
    this.x = 0;
    this.y = SCREEN_HEIGHT/2;
    this.color = "white";
    this.colorTimer = 30;
  },

  update:function () {
    --this.colorTimer;
    if(this.colorTimer < 0){
      this.color = "white";
    }
  },

  draw:function (c) {
    c.fillStyle = this.color;
    c.fillRect(0, 0, this.width, this.height);
  }
});

/*
 * ボール
 */
var Ball = tm.createClass({
  superClass:tm.app.CanvasElement,

  init:function () {
    this.width = this.height = Math.rand(20, 40);
    this.superInit();

    this.x = Math.rand(this.width, SCREEN_WIDTH - this.width);
    this.y = Math.rand(this.height, SCREEN_HEIGHT - this.height);
    this.y = 0;

    //this.radius = this.width;

    this.type = 0;  // 挙動タイプ
    this.speed = {
      "x":Math.rand(5, 15),
      "y":Math.rand(5, 15)
    };
    this.timer = 0;
    this.color = "hsla(200, 75%, 50%, 0.90)";
    this.fillStyle = "#FFFFFF";
    this.fillStyle = this.color;
  },

  update:function () {
    ++this.timer;
    this.move();
  },

  draw:function (c) {
    c.fillCircle(0, 0, this.radius);
    c.strokeStyle = "white";
    c.lineWidth = 2;
    c.strokeCircle(0, 0, this.radius + 1);
    c.setTransformCenter();
  },

  move:function () {
    this.x += this.speed.x;
    this.y += this.speed.y;


    if (this.x < 0 || this.x > SCREEN_WIDTH) {
      this.speed.x *= -1;
    }
    if (this.y < 0 || this.y > SCREEN_HEIGHT) {
      this.speed.y *= -1;
    }

  }
});