(function(ns){

  /* UIのデータを宣言 */
  var UI_DATA = {
    // ラベルの宣言
    LABELS: {
      children: [
        {
          type:"Label",name:"scoreLabel",
          x:320,y:360,width:640,fillStyle:"white",
          text:"line",fontSize:64,align:"center"
        }
      ]
    }
  }

  ns.TitleScene = tm.createClass({
    superClass: tm.app.Scene,

    init: function(){
      this.superInit();

      // ラベルの表示
      this.fromJSON(UI_DATA.LABELS);
    },

    update: function(){
      if( app.pointing.getPointingEnd() == true ){
        tm.sound.SoundManager.get("decide").play();

        /* 波紋を表示 */

        var wave = Wave(app.pointing.x, app.pointing.y, 1500, 512, TITLE_WAVE_IMAGE);
        wave.plusScale = 0.02;
        this.addChild(wave);

        this.addChild( tm.fade.FadeOut(
            app.width, app.height, "#000", 3000, function(){
              app.replaceScene(MainScene());
            })
        );
      }
    },

    /* ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時 */
    onblur: function(){
      //app.pushScene(PauseScene(this.op));
    }
  });

})(window);