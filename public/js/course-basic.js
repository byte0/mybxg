define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
  // 设置导航菜单选中
  util.setMenu('/course/add');
  // 获取课程ID
  var csId = util.qs('cs_id');
  // 获取操作标志位
  var flag = util.qs('flag');
  // 根据课程ID查询课程相关信息
  $.ajax({
    type : 'get',
    url : '/api/course/basic',
    data : {cs_id : csId},
    dataType : 'json',
    success : function(data){
      if(flag){
        data.result.operate = '课程编辑';
      }else{
        data.result.operate = '课程添加';
      }
      var html = template('basicTpl',data.result);
      $('#basicInfo').html(html);
      // 处理二级分类的下拉联动
      $('#firstType').change(function(){
        var pid = $(this).val();
        // 根据一级分类的ID查询二级分类的数据
        $.ajax({
          type : 'get',
          url : '/api/category/child',
          data : {cg_id : pid},
          dataType : 'json',
          success : function(data){
            // 拼接二级分类的下拉选项
            var tpl = '<option value="">请选择二级分类...</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
            var html = template.render(tpl,{list : data.result});
            $('#secondType').html(html);
          }
        });
      });
      // 处理富文本
      CKEDITOR.replace('editor',{
        toolbarGroups : [
          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
        ]
      });
      // 处理表单提交
      $('#basicForm').validate({
        sendForm : false,
        valid : function(){
          // 处理富文本内容同步
          for(var instance in CKEDITOR.instances){
            CKEDITOR.instances[instance].updateElement();
          }
          // 提交表单
          $(this).ajaxSubmit({
            type : 'post',
            url : '/api/course/update/basic',
            data : {cs_id : csId},
            dataType : 'json',
            success : function(data){
              if(data.code == 200){
                location.href = '/course/picture?cs_id=' + data.result.cs_id;
              }
            }
          });
        }
      });

    }
  });
  
});