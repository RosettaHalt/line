(function(ns){
  ns.MainScene = tm.createClass({
    superClass: tm.app.Scene,

    /* シーンの初期化 */
    init: function(){
      this.superInit();
      userData.score = 0; // スコアを初期化
      this.ballNum = 0; // 敵の数
      this.BALL_MAX = 1000; //敵の最大数

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
      for(var i = 0; i < this.ballGroup.children.length; ++i){
        var ball = this.ballGroup.children[i];
        if(this.line.isHitElement(ball) == true){
          console.log("ball hit");
          ball.remove();
          --this.ballNum;
          console.log(this.line.x, this.line.y, this.line.width, this.line.height);
          console.log(ball.x, ball.y, ball.width, ball.height);
          console.log("\n");
        }
        if(this.line.isHitPoint(app.pointing.x, app.pointing.y) == true){
          console.log("hit point");
        }

      }
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
    this.width = SCREEN_WIDTH;
    this.height = 30;
    this.superInit(this.width, this.height);
    this.x = 0;
    this.y = SCREEN_HEIGHT/2;
    this.color = "#FFFFFF";

    // this.img = tm.app.Shape(this.width, this.height);
    // this.img.canvas = LINE_IMAGE;
    // this.img.x = 320;
    // this.addChild(this.img);
  },

  update:function () {
  },

  draw:function (c) {

    c.fillRect(0, 0, this.width, this.height);
    //drawBoundingRect(c);
    // c.fillStyle = this.color;
    // c.fillRect(this.x, 0-(this.height/2), this.width, this.height);

    // c.strokeStyle = "hsla(200, 75%, 50%, 0.90)";
    // c.lineWidth = 2;
    // c.strokeRect(this.x, 0-(this.height/2), this.width, this.height);
    // c.setTransformCenter();
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
      "x":Math.rand(5, 30),
      "y":Math.rand(5, 30)
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
//    this.x += this.speed.x;
    this.y += this.speed.y;


    // if (this.x < 0 || this.x > SCREEN_WIDTH) {
    //   this.speed.x *= -1;
    // }
    // if (this.y < 0 || this.y > SCREEN_HEIGHT) {
    //   this.speed.y *= -1;
    // }

  }
});
