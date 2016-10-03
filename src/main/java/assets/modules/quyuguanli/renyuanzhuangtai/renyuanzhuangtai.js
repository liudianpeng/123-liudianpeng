define(["avalon","domReady!","mmRequest",
"../../../vendor/avalon.oniui/datepicker/avalon.coupledatepicker"],

function(avalon,domReady,mmRequest,coupledatepicker){

   var renyuanVm = avalon.define({
        $id:"renyuanzhuangtai",
//        activeCriminal: "",
//        pushToTop: function(){
//            window.parent.avalon.vmodels.pages.activeCriminal=this.value;
//        },
        ryzt : '人员状态',
        items : {},
        //data: function(){
        //    var url = "/api/quyuguanli/renyuanfenbu/list";
        //    return avalon.get(url,[],function(data){
        //        renyuanVm.items = data;
        //        avalon.log(data.length);
        //     },"json");
        //},
        //baogaren :document.getElementById("jid").value,
        bgr : '',//报告人
        danwei : '',//单位
        quyu : '',//区域
        riqi : '',
        //日历
        $c0pts : {
            onSelect : function(date,vmodel,data){
                avalon.log("选中日期后的用户回调")
                avalon.log(arguments);
                renyuanVm.riqi.$c0pts=date;
                //renyuanVm
                //data
             }
        },
        selectchange: function() {
            renyuanVm.bgr = this.value;
        },
        //搜索
        //searchData :function(){
        //    var url = "/api/quyuguanli/renyuanfenbu/list";
        //    return avalon.get(url,[],function(data){
        //        renyuanVm.items = data[0];
        //        avalon.log(data.length);
        //     },"json");
        //}
    });
        renyuanVm.$watch("danwe",function(){
           console.log(this.value);
        })
    renyuanVm.data();
    avalon.scan();
});