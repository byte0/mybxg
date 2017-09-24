define(['jquery','util','form'],function($,util){
  // 设置导航菜单选中
  util.setMenu(location.pathname);
  // 绑定表单提交单击事件
  $('#courseBtn').click(function(){
    $('#courseForm').ajaxSubmit({
      type : 'post',
      url : '/api/course/create',
      dataType : 'json',
      success : function(data){
        if(data.code == 200){
          // 跳转到下一步
          location.href = '/course/basic?cs_id=' + data.result.cs_id;
        }
      }
    });
  });
});