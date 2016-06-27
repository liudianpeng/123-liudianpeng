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

$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {
                    display: '姓名',
                    name: 'name',
                    width: 150,
                    align: 'left'
                },
                {
                    display: '电话',
                    name: 'phone',
                    width: 150,
                    align: 'left'
                },
                {
                    display: '亲属',
                    name: 'qinshu_name',
                    minWidth: 100,
                    align: 'left'
                },
                {
                    display: '关系',
                    name: 'relation',
                    minWidth: 140,
                    align: 'left'
                }
            ],
            width: 550,
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
                {display: '亲情电话录音', name: 'qqdate', width: 540, type: 'int', align: 'left', render: bofang}
            ],
            width: 550,
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
    return "<a style='color:#000;'  href='javascript:shipin();'>" + riqi + "</a>"
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




