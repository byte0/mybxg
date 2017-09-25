define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
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

      // 选中图片
      var img = $('.preview img').eq(0);
      var nowCrop = null;

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
          // 上传成功之后直接选中选区
          cropImage();
          $('#cropBtn').text('保存图片').attr('data-flag',true);
        }
      });
      // 处理封面裁切

      $('#cropBtn').click(function(){
        var flag = $(this).attr('data-flag');
        if(flag){
          // 跳转到下一个步骤
          $('#cropForm').ajaxSubmit({
            type : 'post',
            url : '/api/course/update/picture',
            data : {cs_id : csId},
            dataType : 'json',
            success : function(data){
              if(data.code == 200){
                // 跳转到下一个步骤
                location.href = '/course/lesson?cs_id=' + data.result.cs_id;
              }
            }
          });
        }else{
          // 第一次点击
          $(this).text('保存图片').attr('data-flag',true);
          // 实现裁切功能
          cropImage();
        }
      });

      
      // 封装一个独立的方法实现裁切图片功能
      function cropImage(){
        img.Jcrop({
          aspectRatio : 2
        },function(){
          // 销毁之前的裁切实例
          nowCrop && nowCrop.destroy();
          nowCrop = this;

          // 获取图片的宽度和高度
          var width = this.ui.stage.width;
          var height = this.ui.stage.height;
          // 计算选区的参数
          var x = 0;
          var y = (height - width/2)/2;
          var w = width;
          var h = width/2;
          // 初始化默认选区参数
          var aInput = $('#cropForm').find('input');
          aInput.eq(0).val(x);
          aInput.eq(1).val(y);
          aInput.eq(2).val(w);
          aInput.eq(3).val(h);
          // 动态创建一个选区
          this.newSelection();
          this.setSelect([x,y,w,h]);
          // 初始化缩略预览图
          this.initComponent('Thumbnailer',{
            width : 240,
            height : 120,
            mythumb : '.thumb'
          });
          $('.jcrop-thumb').css({
            position : 'absolute',
            top : 0,
            left : 0
          });
          // 监控选区变化事件
          img.parent().on('cropstart cropmove cropend',function(a,b,c){
            var aInput = $('#cropForm').find('input');
            aInput.eq(0).val(c.x);
            aInput.eq(1).val(c.y);
            aInput.eq(2).val(c.w);
            aInput.eq(3).val(c.h);
          });
        });
      }
    }
  });
});