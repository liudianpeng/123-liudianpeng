//var manager;
var cid =window.parent.wei.selectedCriminal;

    $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
        var html ="亲情会见　　"+ "当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
        //alert(res.dabh)
        if ("fenjianqu" in res&&null!==res.fenjianqu){
            html = html + " | 分监区："+res.fenjianqu.name;
        }
        $('#title').html(html);
    });


//2016-3-31 gird显示加分页 --start
var manager;
var manager1;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: '接见日期', name: 'jjrq', width: 130, type: 'date', align: 'left'},
                {display: '亲属姓名', name: 'jjqs',  minWidth: 250, align: 'left'}
            ],
            width: '35%',
            pageSizeOptions: [100, 150, 200, 250],
            //height: 480,
            height: '97%',
            isShowDetailToggle: true,
            pageSize: 100,
            record: 'total',
            url: '/api/xinxiguanli/qinqinghuijian/qinqinghuijianList/' + cid,
            dataAction: 'server', //服务器处理
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            onLoaded: function () {
                var arry = this.data;
                //console.log(arry);
                if (arry.items.length == 0) {
                    $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                    $(".l-grid-loading").remove();
                }
            }
        });
});
$(function () {
    window['g1'] =
        manager1 = $("#maingrid1").ligerGrid({
            columns: [
                {display: '亲情会见（音/视）频', name: 'hjdate', width: 250, type: 'int', align: 'left',render:bofang}
            ],
            width: '19%',
            pageSizeOptions: [100, 150, 200, 250],
            //height: 480,
            height: '97%',
            isShowDetailToggle: true,
            pageSize: 100,
            record: 'total',
            url: '/api/xinxiguanli/qinqinghuijian/getMeetingRecord/' + cid,
            dataAction: 'server', //服务器处理
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            onLoaded: function () {
                var arry = this.data;
                //console.log(arry);
                if (arry.items.length == 0) {
                    $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                    $(".l-grid-loading").remove();
                }
            }
        }
    );
    $(".l-grid-loading").remove();
});
function bofang(rowdata) {
    var riqi = rowdata.hjdate ;
    return "<a style='color:#000;'  href='javascript:shipin()'>" + riqi + "</a>"
}
function shipin() {
    var selectedId = manager1.getSelectedRow().id;
    //alert(selectedId);
    var path = manager1.getSelectedRow().filepath;
    //alert(path);
    $('#jp_container_1').removeClass('l-hidden');
    $("#jquery_jplayer_1").jPlayer("destroy");
    $("#jquery_jplayer_1").jPlayer({
        ready: function (event) {
            $(this).jPlayer("setMedia", {
                title: "录音",
                mp3: path
            });
        },
        swfPath: "/assets/vendor/jPlayer-2.9.2/dist/jplayer/",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });
}
// --end

//$.getJSON('/api/xinxi/qinqinghuijian/relations/'+cid,function(res){
//            for(var i=0;i<res.length;i++){
//            $("#qqhj_xm").append("<li><a>"+"<b>"+"亲属姓名："+"</b>"+res[i].xm+"</a></li>");
//        };
//})
//根据原系统数据;亲属关系是在meeting表中查出
//$.getJSON('/api/xinxi/qinqinghuijian/relations/'+cid,function(res){
//
//})
//$.getJSON('/api/xinxiguanli/qinqinghuijian/qqhjList/'+cid,function(huijianData){
//        //alert(huijianData[0].id)
//
//        for(var i=0;i<huijianData.length;i++){
//            $("#huijian_dn").append("<li><a>"+"<b>"+"接见日期："+"</b>"+date_riqi(huijianData[i].jjrq,1)+"</a></li>");
//            //3.30号按照原系统显示
//            $("#qqhj_xm").append("<li><a>"+"<b>"+"亲属姓名："+"</b>"+huijianData[i].jjqs+"</a></li>");
//        };
//
//        //此处绑定点击日期事件;/////////////////////////////////////////////////////////////////
//        var p_list =$('#huijian_dn>li')
//        ////alert("日期个数="+p_list.length);
//        for(var n = 0;n<p_list.length;n++){
//            p_list[n].index = n;
//            p_list[n].onclick = function(){
//                var m = this.index;//
//                //点击之后要获取亲情会见的id
//                    document.getElementById('qqhj_shipin').innerHTML='';
//                    $.getJSON('/api/xinxi/qinqinghuijian/file/'+huijianData[m].id,function(fileData){
//                        for(var o = 0;o<fileData.length;o++){
//                            $("#qqhj_shipin").append("<li><a>"+"点击播放"+"</a></li>");
//                        }
//                        //此处绑定点击视频列表事件;/////////////////////////////////////////////////////////////////
//                        var p_list_video = $('#qqhj_shipin>li');//统计li标签
//                        ////alert("点击播放的个数="+p_list_video.length)
//                        for(var n = 0;n<p_list_video.length;n++){
//                            p_list_video[n].index = n;
//                            p_list_video[n].onclick = function() {
//                                var m1 = this.index;//
//                                var path = fileData[m1].filepath;
//                                //  console.log("m1=="+m1+" "+  this.getAttribute("video_path"));
//                                $('#jp_container_1').removeClass('l-hidden');
//                                $("#jquery_jplayer_1").jPlayer("destroy");
//                                $("#jquery_jplayer_1").jPlayer({
//                                    ready: function (event) {
//                                        $(this).jPlayer("setMedia", {
//                                            title: "录音",
//                                            mp3: path
//                                        });
//                                    },
//                                    swfPath:"/assets/vendor/jPlayer-2.9.2/dist/jplayer/" ,
//                                    supplied: "mp3",
//                                    wmode: "window",
//                                    useStateClassSkin: true,
//                                    autoBlur: false,
//                                    smoothPlayBar: true,
//                                    keyEnabled: true,
//                                    remainingDuration: true,
//                                    toggleDuration: true
//                                });
//
//                            };
//                        }
//                    })
//                }
//
//            }//右侧视频绑定事件处理结束
//        ////////////////////////////////////////////////////////////////////////////////////////
//    });

/////////////////////////////////////////////////////////////////////////////////////////////////////
//一下是非gird的代码
//var manager;
//$(function ()
//{
//
//    var id = window.parent.wei.selectedCriminal;
//
//    var url = '/api/xinxi/qinqinghuijian/relations/'+id;
//
//    $.getJSON(url, function(res){
//        for(var i=0;i<res.length;i++){
//            $("#qqhj_xm").append("<li><a>"+"<b>"+"亲属姓名："+"</b>"+res[i].xm+"</a></li>");
//        };
//        var ul=document.getElementById('qqhj_xm');
//        var ul_lis=ul.getElementsByTagName('li');
//        for (var i = 0;i < ul_lis.length; i++) {
//            ul_lis[i].index = i;
//            ul_lis[i].onclick=function(){
//                var j=this.index;
//                //window.parent.wei.shehuiguanxi=res[j].id; //获取社会关系id
//                //var shehuiId=window.parent.wei.shehuiguanxi;
//                var shehuiId = res[j].id;//这样直接获得就可以了
//                //alert(j+"///"+shehuiId);
//
//                //此处可以继续写点击事件//////////
//                var div = document.getElementById("huijian_dn");
//                var shipin_div = document.getElementById("qqhj_shipin");//点击下一个日期清空视频div用
//                if(div.innerHTML==''){
//                    $.getJSON('/api/xinxi/qinqinghuijian/list/'+id+'/'+shehuiId,function(huijianData){
//                        for(var i=0;i<huijianData.length;i++){
//                            $("#huijian_dn").append("<li><a>"+"<b>"+"接见日期："+"</b>"+date_riqi(huijianData[i].jjrq,1)+"</a></li>");
//
//                        };
//                    })
//                }else{
//                    document.getElementById('huijian_dn').innerHTML='';
//                    ///     document.getElementById("qqhj_shipin").innerHTML='';
//                    $.getJSON('/api/xinxi/qinqinghuijian/list/'+id+'/'+shehuiId,function(huijianData){
//                        //alert(huijianData[0].id)
//                        for(var i=0;i<huijianData.length;i++){
//                            $("#huijian_dn").append("<li><a>"+"<b>"+"接见日期："+"</b>"+date_riqi(huijianData[i].jjrq,1)+"</a></li>");
//                        };
//
//                        //此处绑定点击日期事件;/////////////////////////////////////////////////////////////////
//                        var huijian_dn_div = document.getElementById('huijian_dn');
//                        var p_list = huijian_dn_div.getElementsByTagName('li');
//                        //alert(p_list.length);
//                        for(var n = 0;n<p_list.length;n++){
//                            p_list[n].index = n;
//                            p_list[n].onclick = function(){
//                                var m = this.index;//
//                                document.getElementById('qqhj_shipin').innerHTML='';
//
//                                var m = this.index;//
//                                //点击之后要获取亲情会见的id
//                                if(shipin_div == ''){
//                                    $.getJSON('/api/xinxi/qinqinghuijian/file/'+huijianData[m].id,function(fileData){
//                                        for(var o = 0;o<fileData.length;o++){
//                                            //$("#qqhj_shipin").append("<li><a>"+fileData[o].filepath+"</a></li>");
//                                            $("#qqhj_shipin").append("<li><a>"+"点击播放"+"</a></li>");
//
//
//                                        }
//                                        //此处绑定点击视频列表事件;/////////////////////////////////////////////////////////////////
//                                        var qqhj_shipin_div = document.getElementById('qqhj_shipin');
//                                        var p_list_video = qqhj_shipin_div.getElementsByTagName('p');
//                                        for(var n = 0;n<p_list_video.length;n++){
//                                            p_list_video[n].index = n;
//                                            p_list_video[n].onclick = function() {
//                                                var m1 = this.index;//
//                                                console.log("m1=="+m1);
//                                            };
//                                        }
//                                    })
//                                }else{
//                                    document.getElementById('qqhj_shipin').innerHTML='';
//                                    $.getJSON('/api/xinxi/qinqinghuijian/file/'+huijianData[m].id,function(fileData){
//                                        for(var o = 0;o<fileData.length;o++){
//                                            //$("#qqhj_shipin").append("<a video_path=\""+fileData[o].filepath+"\""+">"+fileData[o].filepath+"</a>");
//                                            $("#qqhj_shipin").append("<li><a>"+"点击播放"+"</a></li>");
//                                        }
//                                        //此处绑定点击视频列表事件;/////////////////////////////////////////////////////////////////
//                                        var qqhj_shipin_div = document.getElementById('qqhj_shipin');
//                                        var p_list_video = qqhj_shipin_div.getElementsByTagName('a');
//                                        for(var n = 0;n<p_list_video.length;n++){
//                                            p_list_video[n].index = n;
//                                            p_list_video[n].onclick = function() {
//                                                var m1 = this.index;//
//                                                //  console.log("m1=="+m1+" "+  this.getAttribute("video_path"));
//                                                $('#jp_container_1').removeClass('l-hidden');
//                                                $("#jquery_jplayer_1").jPlayer("destroy");
//                                                $("#jquery_jplayer_1").jPlayer({
//                                                    ready: function (event) {
//                                                        $(this).jPlayer("setMedia", {
//                                                            title: "视频",
//                                                            m4v: "/data/qinqinghuijian/121.mp4",
//                                                            //flv: fileData[o].filepath,
//                                                            poster: "/data/qinqinghuijian/qqhj.jpg"
//                                                        }).jPlayer("play");
//                                                    },
//                                                    swfPath: "/assets/vendor/jPlayer-2.9.2/dist/jplayer/",
//                                                    supplied: "m4v,flv,webmv, ogv, m4a,oga, mp3",
//                                                    wmode: "window",
//                                                    useStateClassSkin: true,
//                                                    autoBlur: false,
//                                                    smoothPlayBar: true,
//                                                    keyEnabled: true,
//                                                    remainingDuration: true,
//                                                    toggleDuration: true,
//                                                    audioFullScreen: true
//                                                });
//
//                                            };
//                                        }
//                                    })
//                                }
//
//                            }//右侧视频绑定事件处理结束
//                        };//绑定事件结束
//                        ////////////////////////////////////////////////////////////////////////////////////////
//                    })
//                };
//                //////////////////////////////////
//            };//右侧事件处理结束
//
//        };//绑定事件结束
//
//    });//到此处ajax结束
//});
//一下代码是gird代码
//var manager;
//$(function () {
//    var id = window.parent.wei.selectedCriminal;
//    $.getJSON('/api/xinxi/qinqinghuijian/getQingqinghuijian/'+id,function(res){
//        var arry=res.items;
//        window['g'] =
//            manager = $("#maingrid").ligerGrid({
//                    columns: [
//                        {display: '亲属姓名', name: 'name', id: 'deptName', width: 100,minWidth:100, align: 'left'},
//                        {display: '接见日期', name: 'remark', id: 'id1',  minWidth:100,type: 'int', align: 'left',render:bofang},
//                        //{display: '播放', name: 'play', width: 250, align: 'left',render:dianjibofang}
//                    ],
//                    width: '43%',
//                    pageSizeOptions: [100, 150, 200, 250],
//                    height: '97%',
//                    isShowDetailToggle: true,
//                    tree: {
//                        columnId: 'deptName',
//                        //columnName: 'name',
//                        idField: 'id',
//                        parentIDField: 'pid',
//                        isExpand: false,
//                        isLeaf: function (data) {
//                            if (!data) return false;
//                            return data.type == "play";
//                        },
//                        delay: function (e) {
//                            var data = e.data;
//                            if (data.type == "play") {
//                                return {url: '' + data.id}
//                            }
//                            return false;
//                        }
//                    },
//                    pageSize: 100,
//                    record: 'total',
//                    data:res,
//                    url: '/api/xinxi/qinqinghuijian/getQingqinghuijian/'+id,
//                    dataAction: 'server', //服务器处理
//                    root: 'items',
//                    usePager: true,       //服务器分页
//                    alternatingRow: false,
//                    method: 'get',
//                    pagesizeParmName: 'limit',
//                    switchPageSizeApplyComboBox: true,
//                    onBeforeShowData: function () {
//                    },
//                    onAfterShowdata: function () {
//                    }
//                }
//            );
//        if(arry.length==0){
//            $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
//        }else {
//            manager.reload();
//        }
//        manager.collapseAll();
//        manager.collapse();
//    });
//
//
//});
//
//
//function getSelected() {
//    var row = manager.getSelectedRow();
//    if (!row) {
//        alert('请选择行');
//        return;
//    }
//    alert(JSON.stringify(row));
//}
//function reload() {
//    manager.collapseAll();
//    manager.reload();
//    manager.collapseAll();
//}
//function collapseAll()
//{
//    manager.collapseAll();
//}
//
//function bofang(rowdata) {
//   var  riqi = rowdata.remark===null ? "请选择会见日期": rowdata.remark;
//    return "<a style='color:#000;' href='javascript:shipin();'>"+riqi+"</a>"
//}
//
//function shipin(){
//    var selectedId = manager.getSelectedRow().id;
////  alert(selectedId);
//var shipin_div = $("#qqhj_shipin");//点击下一个日期清空视频div用
//if(shipin_div == ''){
//    $.getJSON('/api/xinxi/qinqinghuijian/file/'+selectedId,function(fileData){
//        for(var o = 0;o<fileData.length;o++){
////          $("#qqhj_shipin").append("<li><a>"+fileData[o].filepath+"</a></li>");
//$("#qqhj_shipin").append("<li><a>"+"点击播放"+"</a></li>");
//}
////   此处绑定点击视频列表事件;/////////////////////////////////////////////////////////////////
//var qqhj_shipin_div = $('#qqhj_shipin');
//var p_list_video = $('#qqhj_shipin>p');
//for(var n = 0;n<p_list_video.length;n++){
//    p_list_video[n].index = n;
//    p_list_video[n].onclick = function() {
//        var m1 = this.index;//
////          console.log("m1=="+m1);
//};
//}
//})
//}else{
//    $('#qqhj_shipin').html("");
//    $.getJSON('/api/xinxi/qinqinghuijian/file/'+selectedId,function(fileData){//这里是会见录音文件（每次会见会有多个录音）
//        for(var o = 0;o<fileData.length;o++){
////  $("#qqhj_shipin").append("<a video_path=\""+fileData[o].filepath+"\""+">"+fileData[o].filepath+"</a>");
//$("#qqhj_shipin").append("<li><a>"+"点击播放"+"</a></li>");
//}
////此处绑定点击视频列表事件;/////////////////////////////////////////////////////////////////
//var qqhj_shipin_div = $('#qqhj_shipin');
//var p_list_video =  $('#qqhj_shipin>li>a');
//for(var n = 0;n<p_list_video.length;n++){
//    p_list_video[n].index = n;
//    p_list_video[n].onclick = function() {
//        var m1 = this.index;//
//        var path = fileData[m1].filepath;
////  console.log("m1=="+path);
////alert(fileData[m1].id)
//$('#jp_container_1').removeClass('l-hidden');
//$("#jquery_jplayer_1").jPlayer("destroy");
//$("#jquery_jplayer_1").jPlayer({
//    ready: function (event) {
//        $(this).jPlayer("setMedia", {
//            title: "录音",
//            mp3: path
//        });
//    },
//    swfPath: "/assets/vendor/jPlayer-2.9.2/dist/jplayer/",
//    supplied: "mp3",
//    wmode: "window",
//    useStateClassSkin: true,
//    autoBlur: false,
//    smoothPlayBar: true,
//    keyEnabled: true,
//    remainingDuration: true,
//    toggleDuration: true
//
//根据客户需求,这里不应该显示视频,而是录音文件３．２５号
// //$('#jp_container_1').removeClass('l-hidden');
// //$("#jquery_jplayer_1").jPlayer("destroy");
// //$("#jquery_jplayer_1").jPlayer({
// //    ready: function (event) {
////        $(this).jPlayer("setMedia", {
// //           title: "视频",
//   //         m4v: "/data/qinqinghuijian/121.mp4",
//     //       flv: fileData[o].filepath,
//   //poster: "/data/qinqinghuijian/qqhj.jpg"
////}).jPlayer("play");
// //},
// //swfPath: "/assets/vendor/jPlayer-2.9.2/dist/jplayer/",
// //supplied: "m4v,flv,webmv, ogv, m4a,oga, mp3",
// //wmode: "window",
// //useStateClassSkin: true,
////autoBlur: false,
// //smoothPlayBar: true,
////keyEnabled: true,
////remainingDuration: true,
////toggleDuration: true,
////audioFullScreen: true
//});
//};
//}
//})
//}
//}
