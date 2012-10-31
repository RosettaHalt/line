// グローバルな設定
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 1136;

tm.main(function(){
  app = tm.app.CanvasApp("#world");
  app.background = "black";
  //app.enableStats();
  app.fitWindow();

  // ユーザーのデータを取得
  userData = tm.util.DataManager.get("user-data");

  // タイトルへ
  app.replaceScene(MainScene());

  app.run();
});