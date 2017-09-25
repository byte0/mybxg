define(['jquery','template','util','uploadify'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/course/add');
  // 获取课程ID
  var csId = util.qs('cs_id');
  // 获取课程封面数据
  $.ajax({
    type : 'get',
    url : '/api/course/picture',
    data : {cs_id : csId},
    dataType : 'json',
    success : function(data){
      // 解析数据，渲染页面
      var html = template('pictureTpl',data.result);
      $('#pictureInfo').html(html);
      // 处理封面上传
      $('#myfile').uploadify({
        width : 80,
        height : 'auto',
        itemTemplate : '<span></span>',
        buttonText : '选择图片',
        buttonClass : 'btn btn-success btn-sm',
        swf : '/public/assets/uploadify/uploadify.swf',
        uploader : '/api/uploader/cover',
        fileObjName : 'cs_cover_original',
        formData : {cs_id : csId},
        onUploadSuccess : function(a,b,c){
          var obj = JSON.parse(b.trim());
          $('.preview img').attr('src',obj.result.path);
        }
      });
    }
  });
});