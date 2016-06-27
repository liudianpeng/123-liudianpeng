//ie6
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
                {display: '接见日期', name: 'jjrq', width: 200, type: 'date', align: 'left'},
                {display: '亲属姓名', name: 'jjqs',  minWidth: 240, align: 'left'}
            ],
            width: 550,
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
                    {display: '亲情会见（音/视）频', name: 'hjdate', width: 540, type: 'int', align: 'left',render:bofang}
                ],
                width: 550,
                pageSizeOptions: [100, 150, 200, 250],
                //height: 480,
                height: "97%",
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


