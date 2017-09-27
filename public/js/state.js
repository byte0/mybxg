define(['jquery'],function($){
  $(document).ajaxStart(function(){
    // 显示遮罩层
    $('.overlay').show();
  });
  $(document).ajaxStop(function(){
    // 显示遮罩层
    setTimeout(function(){
      $('.overlay').hide();
    },500);
  });
});