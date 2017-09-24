define(['jquery','template','ckeditor','uploadify','region','datepicker','language'],function($,template,CKEDITOR){
  // 调用接口获取个人信息
  $.ajax({
    type : 'get',
    url : '/api/teacher/profile',
    dataType : 'json',
    success : function(data){
      // 解析数据，渲染页面
      var html = template('settingsTpl',data.result);
      $('#settingsInfo').html(html);
      // 处理头像上传
      $('#upfile').uploadify({
        width : 120,
        height : 120,
        buttonText : '',
        itemTemplate : '<span></span>',
        swf : '/public/assets/uploadify/uploadify.swf',
        uploader : '/api/uploader/avatar',
        fileObjName : 'tc_avatar',
        onUploadSuccess : function(a,b){
          var obj = JSON.parse(b);
          $('.preview img').attr('src',obj.result.path);
        }
      });
      // 处理省市县三级联动
      $('#pcd').region({
        url : '/public/assets/jquery-region/region.json'
      });
      // 处理富文本
      CKEDITOR.replace('editor',{
        toolbarGroups : [
          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
        ]
      });
    }
  });
});