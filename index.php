<?php 
  // 后端路由（根据URL的不同响应不同的页面）

  // header('content-type:text/html; charset=utf8');
  // include('./header.html');
  // echo '<div>主页内容</div>';
  // include('./footer.html');
  // include 在当前PHP页面内部嵌入一个子页面

  // 必须能够通过URL区分出用户想访问哪个页面

  // 默认目录名称
  $dir = 'main';
  // 默认文件名称
  $filename = 'index';

  // 处理URL的路径
  if(array_key_exists('PATH_INFO', $_SERVER)){
    // PATH_INFO属性存在
    // 获取请求路径
    $path = $_SERVER['PATH_INFO']; // /main/index
    // 去掉第一个斜杠
    $str = substr($path, 1); // main/index
    // 字符串分割，和js中split方法很像
    $ret = explode('/', $str);
    if(count($ret) == 2){
      // 路由有两层
      $dir = $ret[0];// 覆盖目录
      $filename = $ret[1]; // 覆盖文件名称
    }else{
      // 其他情况全部跳转到登录页面
      $filename = 'login';
    }
  }
  // 嵌入子页面
  include('./views/'.$dir.'/'.$filename.'.html');

?>
