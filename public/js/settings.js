define(['jquery','template'],function($,template){
  // 调用接口获取个人信息
  $.ajax({
    type : 'get',
    url : '/api/teacher/profile',
    dataType : 'json',
    success : function(data){
      // 解析数据，渲染页面
      var html = template('settingsTpl',data.result);
      $('#settingsInfo').html(html);
    }
  });
});