$(function () {
  var options = {
        //column柱状图
        chart: {
            renderTo:'zhuzhuangtu',
            type: 'column'
        },
        title: {
            text: '区域划分分布图'
        },
        //x坐标轴
        xAxis: {
            categories: [
                '生活区',
                '生产区',
                '其他'
            ],
            crosshair: true
        },
        //x坐标轴
        yAxis: {
            min: 0,
            title: {
                text: '人数'
            }
        },
        //数据点提示框
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} 人</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series:[{},{},{},{},{},{},{},{},{},{},{},{},{}]
        };
  $.getJSON('../assets/quyuhuafen.json',function(data){
       var i,len=data.length;
       for( i=0;i<len;i++){
          //赋值 series
          options.series[i].name = data[i].name;
          options.series[i].data = data[i].data;
       }
       var chart = new Highcharts.Chart(options);
  })
});
