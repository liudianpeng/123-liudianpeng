define(["avalon","domReady!","mmRequest","../../../vendor/jquery-1.8.3","../../../vendor/highcharts"],
function(avalon,domReady,mmRequest,jquery,highcharts){

    var quyufenbuVm = avalon.define({
        $id:"quyufenbu"

    });
$(function () {
    $('#zhuzhuangtu').highcharts({
        //column柱状图
        chart: {
            type: 'column'
        },
        title: {
            text: '区域管理分布图'
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
        series: [ {
            name: '合计',
            data: [183, 178,122]

        }, {
            name: '劳动岗',
            data: [48, 38, 39]

        },{
            name: '住院西',
            data: [48, 38, 39]
        },{
            name: '住院东',
            data: [48, 38, 39]
        },{
            name: '集训',
            data: [48, 38, 39]
        },{
            name: '其它',
            data: [42, 33, 34]
        }]
    });
});
    avalon.scan();
});