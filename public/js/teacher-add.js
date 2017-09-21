define(['jquery','template','util'],function($,template,util){
  var tcId = util.qs('tc_id');
  if(tcId){
    // 编辑操作
    $.ajax({
      type : 'get',
      url : '/api/teacher/edit',
      data : {tc_id : tcId},
      dataType : 'json',
      success : function(data){
        // 解析数据，渲染页面
        data.result.operate = '编辑讲师';
        var html = template('teacherTpl',data.result);
        $('#teacherInfo').html(html);
      }
    });
  }else{
    // 添加操作
    var html = template('teacherTpl',{operate:'添加讲师'});
    $('#teacherInfo').html(html);
  }


});