define(['jquery','util','echarts'],function($,util,echarts){
  // 设置导航菜单选中
  util.setMenu(location.pathname);
  // 基于准备好的dom，初始化echarts实例
  var container = $('#main').get(0);
  var myChart = echarts.init(container);
  // 指定图表的配置项和数据
  var option = {
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});