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
        // 处理表单提交
        submitForm('/api/teacher/update');
      }
    });
  }else{
    // 添加操作
    var html = template('teacherTpl',{operate:'添加讲师'});
    $('#teacherInfo').html(html);
    submitForm('/api/teacher/add');
  }

  // 实现表单提交
  function submitForm(url){
    $('#teacherBtn').click(function(){
      $.ajax({
        type : 'post',
        url : url,
        data : $('#teacherForm').serialize(),
        dataType : 'json',
        success : function(data){
          if(data.code == 200){
            location.href = '/teacher/list';
          }
        }
      });
    });
  }


});