(function(ns){

  var UI_DATA = {
    LABELS: {
      children: [
        {
          type:"Label",name:"scoreLabel",
          x:320,y:360,width:480,fillStyle:"white",
          text:"dammy",fontSize:48,align:"center"
        }
      ]
    }
  }

  ns.EndScene = tm.createClass({
    superClass: tm.app.Scene,

    init: function(){
      this.superInit();

      // ラベル
      this.fromJSON(UI_DATA.LABELS);
      this.scoreLabel.text = "score : "+userData.score;

      // タイトルボタン
      var iphoneButton = tm.app.iPhoneButton(120, 60, "black");
      iphoneButton.setPosition(200,640);
      iphoneButton.label.text = "Title";
      this.addChild(iphoneButton);
      var self = this;
      iphoneButton.onpointingstart = function(){
        self.nextScene();
      };

      // ツイートボタン
      var msg = tm.social.Twitter.createURL({
        type: "tweet",
        text: "line\nScore : {0}連鎖\n".format(userData.score),
        hashtags: "js,javascript,tmline,tmlibjs",
        url: "http://bit.ly/SzzbPM"
      });
      var tweetButton = tm.app.iPhoneButton(120, 60, "black");
      tweetButton.setPosition(440, 640);
      tweetButton.label.text = "Tweet";
      this.addChild(tweetButton);
      tweetButton.onpointingstart = function(){
        window.open(msg, "_self");
      };
    },

    update: function(){
    },

    nextScene: function(){
      this.addChild( tm.fade.FadeOut(
          app.width, app.height, "#000", 1000, function(){
            app.replaceScene(TitleScene());
          })
      );
    },

    /* ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時 */
    onblur: function(){
      app.pushScene(PauseScene());
    }
  });
})(window);
