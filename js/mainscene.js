(function(ns){
  ns.MainScene = tm.createClass({
    superClass: tm.app.Scene,

    /* シーンの初期化 */
    init: function(){
      this.superInit();
      userData.score = 0; // スコアを初期化

      this.chara = Character(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 64, 64);   // 自機を生成
      this.addChild(this.chara);  // 自機をシーンに追加
      console.log("main");
    },

    /* シーンの更新 */
    update: function(){
      // 画面クリックでシーン切り替え{
      console.log(this.chara.x, this.chara.y, app.pointing.x, app.pointing.y)
      if ( this.chara.isHitPoint(app.pointing.x, app.pointing.y) == true){
        console.log("Hit");
        this.addChild( tm.fade.FadeOut(
            app.width, app.height, "#000", 1000, function(){
              app.replaceScene(EndScene());
            })
        );
      }

    },

    /* ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時 */
    onblur: function(){
      //app.pushScene(PauseScene(this.bgm));
    }
  });
})(window);

/*
 * 自機
 */
var Character = tm.createClass({
  superClass: tm.app.CanvasElement,

  init: function(x,y,w,h){
    this.superInit(w,h);
    this.x = x;
    this.y = y;
    this.fillStyle = "#FFFFFF";
    this.radius = 8;
  },

  update: function(){
    this.control();
  },

  draw: function(c){
    c.fillCircle(0, 0, this.radius);
    c.strokeStyle = "white";
    c.lineWidth = 2;
    c.strokeCircle(0, 0, this.radius+1);
  },

  control: function(){
    if( app.pointing.getPointing() == true ){
      if(this.x < app.pointing.x){
        this.x += 5;
      }
      else{
        this.x -= 5;
      }
    }
    if( app.pointing.getPointing() == true ){
      if(this.y < app.pointing.y){
        this.y += 5;
      }
      else{
        this.y -= 5;
      }
    }
  }
})