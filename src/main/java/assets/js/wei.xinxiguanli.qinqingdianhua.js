var manager;
var cid = window.parent.wei.selectedCriminal;

    $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
        var html = "亲情电话　　"+"当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
        //alert(res.dabh)
        if ("fenjianqu" in res&&null!==res.fenjianqu){
            html = html + " | 分监区："+res.fenjianqu.name;
        }
        $('#title').html(html);
    });

//$.getJSON("/api/xinxiguanli/qinqingdianhua/qsxmList/"+cid,function(res){
//    for (var i = 0; i < res.length; i++) {
//        $("#qqdh_xm").append("<li><a>" + "<b>" + "亲属姓名：" + "</b>" + res[i].xm + "</a></li>");
//    }
//});
//
//    $.getJSON('/api/xinxiguanli/qinqingdianhua/qqdhList/'+cid, function (huijianData) {
//
//            for (var i = 0; i < huijianData.length; i++) {
//                $("#qqhj_rq").append("<li><a>" + "<b>" + "接见日期：" + "</b>" + "<span>" + huijianData[i].qqdate + "</span></a></li>");
//            }
//            //此处绑定点击日期事件;/////////////////////////////////////////////////////////////////
//            //var huijian_dn_div = document.getElementById('qqhj_rq');
//            //var p_list = huijian_dn_div.getElement            sByTagName('p');
//            var p_list = $('#qqhj_rq>li');
//            for (var n = 0; n < p_list.length; n++) {
//                p_list[n].index = n;
//                p_list[n].onclick = function () {
//                    var m = this.index;//
//                    var path = huijianData[m].filepath;
//                    //alert(path)
//                //    点击事件内容
//                    $('#jp_container_1').removeClass('l-hidden');
//                    $("#jquery_jplayer_1").jPlayer("destroy");
//                    $("#jquery_jplayer_1").jPlayer({
//                        ready: function (event) {
//                            $(this).jPlayer("setMedia", {
//                                title: "录音",
//                                mp3: path
//                            });
//                        },
//                        swfPath:"/assets/vendor/jPlayer-2.9.2/dist/jplayer/" ,
//                        supplied: "mp3",
//                        wmode: "window",
//                        useStateClassSkin: true,
//                        autoBlur: false,
//                        smoothPlayBar: true,
//                        keyEnabled: true,
//                        remainingDuration: true,
//                        toggleDuration: true
//                    });
//                }//右侧录音绑定事件处理结束
//            }
//            ;//绑定事件结束
//            ////////////////////////////////////////////////////////////////////////////////
//        })
//2016-3-31 gird显示加分页 --start
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {
                    display: '姓名',
                    name: 'name',
                    width: 70,
                    align: 'left'
                },
                {
                    display: '电话',
                    name: 'phone',
                    width: 100,
                    align: 'left'
                },
                {
                    display: '亲属',
                    name: 'qinshu_name',
                    width: 60,
                    align: 'left'
                },
                {
                    display: '关系',
                    name: 'relation',
                    width: 50,
                    align: 'left'
                }
            ],
            width: '30%',
            pageSizeOptions: [30, 150, 200, 250],
            //height: 480,
            height: '97%',
            isShowDetailToggle: true,
            pageSize: 30,
            record: 'total',
            url: '/api/xinxiguanli/qinqingdianhua/qinshuList/' + cid,
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
        });
});
$(function () {
    window['g1'] =
        manager1 = $("#maingrid1").ligerGrid({
            columns: [
                {display: '亲情电话录音', name: 'qqdate', width: 270, type: 'int', align: 'left', render: bofang}
            ],
            width: 280,
            pageSizeOptions: [100, 150, 200, 250],
            //height: 480,
            height: '97%',
            isShowDetailToggle: true,
            pageSize: 100,
            record: 'total',
            url: '/api/xinxiguanli/qinqingdianhau/qinqingdianhuaList/' + cid,
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
        });
    $(".l-grid-loading").remove();
});
function bofang(rowdata) {
    var riqi = rowdata.qqdate;
    return "<a style='color:#000;' href='javascript:shipin()'>" + riqi + "</a>"
}
function shipin() {
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
        toggleDuration: true,
        onLoaded: function () {
            var arry = this.data;
            //console.log(arry);
            if (arry.items.length == 0) {
                $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                $(".l-grid-loading").remove();
            }
        }
    });
}
//2016-3-31 gird显示加分页 --end


//var manager;
//var id = window.parent.wei.selectedCriminal;
//$(function () {
//    $.getJSON('/api/xinxi/qinqingdianhuas/grid/'+id,function(res){
//        var arry=res.items;
//    window['g'] =
//        manager = $("#maingrid").ligerGrid({
//                columns: [
//                    {display: '亲属姓名', name: 'name', id: 'deptName', width: 100,minWidth:100, align: 'left',render:newdata},
//                    {display: '接见日期', name: 'remark', id: 'id1',  minWidth:100,type: 'int', align: 'left',render:bofang}
//                    //{display: '播放', name: 'filepath', width: 250, align: 'left',render:bofang}
//                ],
//                width: '43%',
//                pageSizeOptions: [30, 150, 200, 250],
//                height: '97%',
//                isShowDetailToggle: true,
//                tree: {
//                    columnId: 'deptName',
//                    //columnName: 'name',
//                    idField: 'id',
//                    parentIDField: 'pid',
//                    isExpand: false,
//                    isLeaf: function (data) {
//                        if (!data) return false;
//                        return data.type == "play";
//                    },
//                    delay: function (e) {
//                        var data = e.data;
//                        if (data.type == "play") {
//                            return {url: '' + data.id}
//                        }
//                        return false;
//                    }
//                },
//                pageSize: 30,
//                record: 'total',
//                data:res,
//                url: '/api/xinxi/qinqingdianhuas/grid/'+id,
//                dataAction: 'server', //服务器处理
//                root: 'items',
//                usePager: true,       //服务器分页
//                alternatingRow: false,
//                method: 'get',
//                pagesizeParmName: 'limit',
//                switchPageSizeApplyComboBox: true,
//                onBeforeShowData: function () {
//                },
//                onAfterShowdata: function () {
//                }
//            }
//        );
//        if(arry.length==0){
//            $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
//        }else {
//            manager.reload();
//        }
//        manager.collapseAll();
//        manager.collapse();
//});
//});
//function newdata(rowdata){
//    return   rowdata.pid===null ? rowdata.name: "";
//}
//function bofang(rowdata) {
//    var  riqi = rowdata.remark===null ? "请选择日期": rowdata.remark;
//    return "<a href='javascript:shipin();'>"+riqi+"</a>"
//}
//function shipin() {
//    var path = manager.getSelectedRow().name;
//    //alert("---"+path)
//    var id = window.parent.wei.selectedCriminal;
//    //此处写点击事件//////////
//     //点击事件内容
//    $('#jp_container_1').removeClass('l-hidden');
//    $("#jquery_jplayer_1").jPlayer("destroy");
//    $("#jquery_jplayer_1").jPlayer({
//        ready: function (event) {
//            $(this).jPlayer("setMedia", {
//                title: "录音",
//                mp3: path
//            });
//        },
//        swfPath: "/assets/vendor/jPlayer-2.9.2/dist/jplayer/",
//        supplied: "mp3",
//        wmode: "window",
//        useStateClassSkin: true,
//        autoBlur: false,
//        smoothPlayBar: true,
//        keyEnabled: true,
//        remainingDuration: true,
//        toggleDuration: true
//    });
//}


///////////////////////////////////////
//var manager;
//$(function () {
//
//    var id = window.parent.wei.selectedCriminal;
//
//    var url = '/api/xinxi/qinqingdianhua/relations/' + id;
//    $.getJSON(url, function (res) {
//        for (var i = 0; i < res.length; i++) {
//            $("#qqdh_xm").append("<li><a>" + "<b>" + "亲属姓名：" + "</b>" + res[i].xm + "</a></li>");
//        }
//        ;
//        var ul = document.getElementById('qqdh_xm');
//        var ul_lis = ul.getElementsByTagName('li');
//        for (var i = 0; i < ul_lis.length; i++) {
//            ul_lis[i].index = i;
//            ul_lis[i].onclick = function () {
//                var j = this.index;
//                var shehuiId = res[j].id;//社会关系id
//                此处写点击事件//////////
//var div = document.getElementById("huijian_dn");//清空日期div用
//var luyin_div = document.getElementById("qqdh_luyin");//清空录音div用
//if (div.innerHTML == '' && luyin_div.innerHTML == '') {
//    $.getJSON('/api/xinxi/qinqingdianhua/list/' + id + '/' + shehuiId, function (huijianData) {
//        for (var i = 0; i < huijianData.length; i++) {
//            $("#huijian_dn").append("<p>" + "<b>" + "接见日期：" + "</b>" + "<span>" + huijianData[i].qqdate + "</span></p>");
//        }
//        ;
//    })
//} else {
//    document.getElementById('huijian_dn').innerHTML = '';
//    $.getJSON('/api/xinxi/qinqingdianhua/list/' + id + '/' + shehuiId, function (huijianData) {
//        for (var i = 0; i < huijianData.length; i++) {
//            $("#huijian_dn").append("<p>" + "<b>" + "接见日期：" + "</b>" + "<span>" + huijianData[i].qqdate + "</span></p>");
//        }
//        ;
//        此处绑定点击日期事件;/////////////////////////////////////////////////////////////////
//var huijian_dn_div = document.getElementById('huijian_dn');
//var p_list = huijian_dn_div.getElementsByTagName('p');
//alert(p_list.length);
//for (var n = 0; n < p_list.length; n++) {
//    p_list[n].index = n;
//    p_list[n].onclick = function () {
//        var m = this.index;//
//        点击事件内容
//document.getElementById('qqdh_luyin').innerHTML = '';
//$("#qqdh_luyin").append("<p>" + huijianData[m].filepath + "</p>");
//$('#jp_container_1').removeClass('l-hidden');
//$("#jquery_jplayer_1").jPlayer("destroy");
//$("#jquery_jplayer_1").jPlayer({
//    ready: function (event) {
//        $(this).jPlayer("setMedia", {
//            title: "录音",
//            mp3: huijianData[m].filepath
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
//});
//}//右侧录音绑定事件处理结束
//}
//;//绑定事件结束
//////////////////////////////////////////////////////////////////////////////
//})
//}
//
//};//右侧事件处理结束
//
//}
//;//绑定事件结束
//});
//
//});