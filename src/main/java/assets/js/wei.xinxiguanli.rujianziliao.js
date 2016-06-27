var manager;
$(function () {
    var id = window.parent.wei.selectedCriminal;


    $.getJSON("/api/xinxi/gerenxinxi/" + id, null, function (res) {
        var html = "入监资料　　" + "当前犯人：" + res.xm + " | 档案编号：" + res.dabh + "  | 监区：" + res.jianqu.name;
        //alert(res.dabh)
        if ("fenjianqu" in res && null !== res.fenjianqu) {
            html = html + " | 分监区：" + res.fenjianqu.name;
        }
        $('#title').html(html);
    });


    $("#addrujianziliao").attr("href", "/xinxiguanli/rujianziliao/" + id + "/new");
    $("#editrujianziliao").attr("href", "/xinxiguanli/rujianziliao/" + id + "/edit");

    $.getJSON("/api/xinxi/rujianziliao/fenlei/" + id, function (res) {
        for (var i = 0; i < res.length; i++) {
            $("#rujianziliaoleibie").append("<li><a>" + "<b>" + res[i].name + "</b>" + "</a></li>");
        }

        var ul = $('#rujianziliaoleibie');
        var ul_lis = $('#rujianziliaoleibie>li');
        for (var i = 0; i < ul_lis.length; i++) {
            ul_lis[i].index = i;
            ul_lis[i].onclick = function () {
                var j = this.index;
                var fenleiId = res[j].id;//入监资料分类id
                //此处写点击事件//////////
                var div = $("#rujianziliao_image");//清空图片div用

                if (div.innerHTML == '') {
                    $.getJSON('/api/xinxi/rujianziliao/list/' + id + '/' + fenleiId, function (huijianData) {
                        for (var i = 0; i < huijianData.length; i++) {
                            $("#rujianziliao_image").append("<a href='" + huijianData[i].filePath + "' target='_blank'>" + "<b>" + "点击下载:" + "</b>" + huijianData[i].sm);
                        }
                    })
                } else {
                    $('#rujianziliao_image').html("");
                    $.getJSON('/api/xinxi/rujianziliao/list/' + id + '/' + fenleiId, function (huijianData) {
                        for (var i = 0; i < huijianData.length; i++) {
                            $("#rujianziliao_image").append("<a href='" + huijianData[i].filePath + "' target='_blank'>" + "<b>" + "点击下载:" + "</b>" + huijianData[i].sm);
                        }
                        //绑定事件结束
                        ////////////////////////////////////////////////////////////////////////////////////////
                    })
                }

            };//右侧事件处理结束

        }

    });

});
//添加入监资料
function addRujianziliao() {
    var id = window.parent.wei.selectedCriminal;
    $("#addrujianziliao").attr("href", "/xinxiguanli/rujianziliao/" + id + "/new");
}

