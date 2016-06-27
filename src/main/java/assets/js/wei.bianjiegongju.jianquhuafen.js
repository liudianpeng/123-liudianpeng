$(function () {
    //var $container = $('#pieChart>li').append("<div></div>");
    //获取json单个监区数据
    //var tmp=[];
    //$.ajax({
    //  type:'GET',
    //  url:'',
    //  success:function(data){
    //    var browers=data[0].data;
    //    for(var i=0;i<browers.length;i++){
    //       tmp.push({
    //          name:browers[i].name,
    //          y:browers[i].y
    //       });
    //    }
    //    chart.series[0].setData(tmp);
    //    console.log(JSON.stringify(tmp));
    //    //console.log(tmp);
    //    }
    //});
    //获取数据
    var CountArray=[];
    $.getJSON("/api/xinxiguanli/jianquhuafen/counts", function (res) {
        for(var i=0;i<res.length;i++){
            var obj = res[i];
            var tmp="";
            var j=0;
            for (j;j<CountArray.length;j++){
                tmp=CountArray[j];
                //console.log(tmp);
                if (tmp.jianqu==obj.jianqu){
                    break;
                }
                tmp="";
            }
            if (tmp==""){
                CountArray.push({
                    "jianqu":obj.jianqu,
                    "data":[{
                        "name":obj.fenjianqu,
                        "y":obj.counts
                    }]
                })
            }else {
                CountArray[j]["data"].push({
                    "name":obj.fenjianqu,
                    "y":obj.counts
                });
            }
            //console.log(CountArray);
        }
        //console.log(CountArray);
        //console.log(JSON.stringify(CountArray));
        //console.log(CountArray.length);
        $.each(CountArray, function(i,item){
            //console.log(i);
            //console.log(item);
                //$("#pieChart").append("121212");
                $("#pieChart").append("<li id=\'container"+i+"\' width='100%'></li>");
                //console.log($("#pieChart").html());
                var chart1 = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container'+i,
                        plotBackgroundColor: '#fff',
                        plotBorderWidth: 0,
                        plotShadow: false
                    },

                    title: {
                        //text:item.jianqu,
                        verticalAlign:'bottom',
                        y:-60
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+
                                Highcharts.numberFormat(this.y, 0, ',') +' 人';
                        }

                    },
                    plotOptions: {
                        pie: {
                            size:'30%',
                            borderWidth:0,
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    return '<b>'+ Highcharts.numberFormat(this.y, 0, '') +'人 '
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '分监区人数',
                        showInLegend:true
                        //data:item.data
                    }]
                });
                chart1.series[0].setData(CountArray[i].data);
                chart1.setTitle({ text:CountArray[i].jianqu},null,false);
        });
    });








});

