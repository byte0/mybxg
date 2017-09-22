define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util){
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
  // 采用表单验证和提交插件提交表单
  function submitForm(url){
    $('#teacherForm').validate({
      sendForm : false,
      valid : function(){
        $(this).ajaxSubmit({
          type : 'post',
          url : url,
          dataType : 'json',
          success : function(data){
            if(data.code == 200){
              location.href = '/teacher/list';
            }
          }
        });
      },
      description : {
        tcName : {
          required : '用户名不能为空'
        },
        tcPass : {
          required : '密码不能为空',
          pattern : '密码必须为6位数字'
        },
        tcJoinDate : {
          required : '日期不能为空'
        }
      }
    });
  }

  // 实现表单提交
  // function submitForm(url){
  //   $('#teacherBtn').click(function(){
  //     $.ajax({
  //       type : 'post',
  //       url : url,
  //       data : $('#teacherForm').serialize(),
  //       dataType : 'json',
  //       success : function(data){
  //         if(data.code == 200){
  //           location.href = '/teacher/list';
  //         }
  //       }
  //     });
  //   });
  // }


});