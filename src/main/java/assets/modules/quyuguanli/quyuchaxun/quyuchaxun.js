define(["avalon","domReady!","mmRequest",
"../../../vendor/avalon.oniui/datepicker/avalon.daterangepicker","../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid"],
function(avalon,domReady,mmRequest,coupledatepicker){
    var qychaxunVm = avalon.define({
        $id:"quyuchaxun",
        qycx :"区域查询",

        //用户进入的时候,默认时间
        //用户选择开始日期的范围
        fromTime:"",//开始时间,默认开始时间
        toTime:"",//结束时间,默认开始时间

            ///////////////////////////////////////////////////
        items : {},
        data1: function(fromTime,toTime){//后台要写好api,url里面要有起始时间
            var url = "/api/quyuguanli/renyuanfenbu/list";//这里应该传递起始日期
            return avalon.get(url,[],function(data){
                qychaxunVm.items = data;
                avalon.log(data.length);
            },"json");
        },
            //////////////////////////////////////////////////
            //要查询的时间范围约束
        $AOpts:{
//            //允许用户最大能查询几天的纪录
//            rules: '2015-12-04, 0D, 365D',//2015-12-04日期是异常后默认显示日期(设置为今天),配置用户选择查询范围最小相隔天数
//
//            fromMinDate: '2015-11-05',//起始日期可以设置的最小日期,(第一次导数据的时间)
//            fromMaxDate: '2015-12-07',//起始日期可以设置的最大日期,不需要设置最大日期
//
//            //结束日期的时间
//            toMinDate: '2015-11-05',//结束日期可以设置的最小日期,不需要设置最小日期
//            toMaxDate: '2015-12-07',//结束日期可以设置的最大日期,这里可以设置为今天

            //这个没用,设置label
//            setlabel : function() {
//                avalon.vmodels['gailabel'].setLabel('日期label');
//            },

            onOpen: function(vmodel) {//
                avalon.log("datepicker 的 open回调，参数是组件对应的vmodel")
//                alert("打开日期组件后执行");
                avalon.log(vmodel)
            },

            onClose: function(vmodel) {
                avalon.log("datepicker 的 close回调，参数是组件对应的vmodel")
                avalon.log(vmodel)
            },


            onSelect : function(fromDate,toDate,oldValue,vmodel,data){//开始时间,结束时间,数据这里写回调,api
                    //fromTime和toTime传进来;data传递是日期
                qychaxunVm.data1(fromDate,toDate);//不知道是否要传
                alert("api");
                avalon.log("选择日期范围之后的回调");
                console.log("------------------------------------"+"fromDate");
                console.log("----选择开始时间-------------"+fromDate);
                avalon.log("toDate");
                avalon.log("-----选择结束时间-------------"+toDate);
                avalon.log("oldValue");
                avalon.log(oldValue);
                avalon.log("daterangepicker vmodel");
                avalon.log(vmodel);
                avalon.log("data is : ");
                avalon.log(data);
            }
        }

   });
    avalon.scan();
});