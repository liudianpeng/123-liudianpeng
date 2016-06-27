define(["avalon","domReady!","mmRequest"],function(avalon,domReady,mmRequest){

    var zhifabiaogeVm = avalon.define({
        $id:"zhifabiaoge",
        xinxiguanli:"信息管理",
        zimulu: "执法表格",

        get_id : window.parent.document.getElementById("get_id").value,
        zfbg : {},
        data : function(){
            var url = "/api/xinxi/zhifabiaoge/gerenxinxi/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
        data1 : function(){
            var url = "/api/xinxi/zhifabiaoge/chufashenpi/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯提请减刑建议书
        data2 : function(){
            var url = "/api/xinxi/zhifabiaoge/tiqingjianxingjianyishu/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯提请假释建议书
        data22 : function(){
            var url = "/api/xinxi/zhifabiaoge/tiqingjiashijianyishu/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },




//        罪犯改造积极分子审批表
        data3 : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifangaizaojijifenzishenpibiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯分级管理审批表
        data4 : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifanfenjiguanlishenpibiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯奖励审批表
        data5 : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifanjianglishenpibiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
  ////////////////////////////////////////////////////////////////////////
//        罪犯保外就医审批表
        data6 : function(){
            var url = "/api/xinxi/zhifabiaoge/baowaijiuyishenpibiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯保外就医取保书
        data7 : function(){
            var url = "/api/xinxi/zhifabiaoge/baowaijiuyiqubaoshu/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯保外就医征求意见书
        data8 : function(){
            var url = "/api/xinxi/zhifabiaoge/baowaijiuyizhengqiuyijianshu/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        保外就医罪犯考察表
        data9 : function(){
            var url = "/api/xinxi/zhifabiaoge/baowaijiuyizuifankaochabiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯保外就医承办单
        dataa : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifanbaowaijiuyichengbandan/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯病残鉴定表
        datab : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifanbingcanjiandingbiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        法定不批准出境人员通报备案通知书
        datac : function(){
            var url = "/api/xinxi/zhifabiaoge/fadingbupizhunchujingrenyuantongbaobeiantongzhishu/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯出监鉴定表
        datad : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifanchujianjiandingbiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯减刑假释会议记录
        datae : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifanjianxingjiashihuiyijilu/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        罪犯死因鉴定书
        dataf : function(){
            var url = "/api/xinxi/zhifabiaoge/zuifansiyinjiandingshu/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        重要罪犯登记表
        datag : function(){
            var url = "/api/xinxi/zhifabiaoge/zhongyaozuifandengjibiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        提请减刑(假释)病残鉴定表
        datah : function(){
            var url = "/api/xinxi/zhifabiaoge/tiqingjianxingbingcanjiandingbiao/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        },
//        从严掌握罪犯减刑(假释)呈报表
        datai : function(){
            var url = "/api/xinxi/zhifabiaoge/congyanzhangwozuifanjianxingTable/"+zhifabiaogeVm.get_id;
            avalon.get(url,function(data){
                zhifabiaogeVm.zfbg = data;
            })
        }

    });
//    zhifabiaogeVm.getData;
    zhifabiaogeVm.data;
    zhifabiaogeVm.data1;
    zhifabiaogeVm.data2;
    avalon.scan();
});