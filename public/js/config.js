require.config({
  baseUrl : '/public/assets',
  paths : {
    jquery : 'jquery/jquery',
    cookie : 'jquery-cookie/jquery.cookie',
    template : 'artTemplate/template-web',
    bootstrap : 'bootstrap/js/bootstrap.min',
    datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker',
    language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    validate : 'validate/jquery-validate',
    form : 'jquery-form/jquery.form',
    uploadify : 'uploadify/jquery.uploadify.min',
    region : 'jquery-region/jquery.region',
    ckeditor : 'ckeditor/ckeditor',
    util : '../js/util',
    common : '../js/common',
    login : '../js/login',
    teacherlist : '../js/teacher-list',
    teacheradd : '../js/teacher-add',
    settings : '../js/settings',
    index : '../js/index',
    courselist : '../js/course-list',
    courseadd : '../js/course-add',
    coursebasic : '../js/course-basic'
  },
  shim : {
    bootstrap : {
      deps : ['jquery']
    },
    language : {
      deps : ['jquery','datepicker']
    },
    validate : {
      deps : ['jquery']
    },
    uploadify : {
      deps : ['jquery']
    },
    ckeditor : {
      exports : 'CKEDITOR'
    }
  }
});