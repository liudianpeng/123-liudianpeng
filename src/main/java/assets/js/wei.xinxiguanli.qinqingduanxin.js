var manager;
var cid = window.parent.wei.selectedCriminal;

    $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
        var html ="亲情短信　　"+ "当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
        //alert(res.dabh)
        if ("fenjianqu" in res&&null!==res.fenjianqu){
            html = html + " | 分监区："+res.fenjianqu.name;
        }
        $('#title').html(html);
    });

//2016-3-31 gird显示加分页 --start
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {
                    display: '类型',
                    name: 'state',
                    width: 200,
                    align: 'left'
                },
                {
                    display: '号码',
                    name: 'phone',
                    width: 200,
                    align: 'left'
                    //render:telphone
                },
                {
                    display: '时间',
                    name: 'senddate',
                    width: 203,
                    type:'date',
                    align: 'left'
                    //render:datetime
                }
            ],
            width: 630,
            pageSizeOptions: [30, 150, 200, 250],
            height: '97%',
            isShowDetailToggle: true,
            pageSize: 30,
            record: 'total',
            url: '/api/xinxiguanli/qinqingduanxin/qinqingdaunxinList/' + cid,
            dataAction: 'server', //服务器处理
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            onSelectRow:function(rowdata){
                //直接点击行,右侧显示短信内容;
                var div = $("#qqhj_nr");
                if (div.innerHTML == '') {
                    $("#qqhj_nr").append(
                        "<p><b>" + rowdata.state + "号码：</b>" + "<span>" + rowdata.phone + "</span></p>"
                        + "<p><b>时间：</b>" + "<span>" + date_riqi(rowdata.senddate, 1) + "</span></p>" +
                        "<p><b>内容：</b>" + "<span>" + rowdata.smscontent + "</span></p>"
                    );
                } else {
                    $("#qqhj_nr").html('');
                    $("#qqhj_nr").append(
                        "<p><b>" + rowdata.state + "号码：</b>" + "<span>" + rowdata.phone + "</span></p>"
                        + "<p><b>时间：</b>" + "<span>" + date_riqi(rowdata.senddate, 1) + "</span></p>" +
                        "<p><b>内容：</b>" + "<span>" + rowdata.smscontent + "</span></p>"
                    );
                }
            },
            onLoaded: function () {
                var arry = this.getData();
                //console.log(arry);
                if (arry.length == 0) {
                    $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                    $(".l-grid-loading").remove();
                }
            }

            

        });
});
//function telphone(rowdata) {
//    var tel = rowdata.phone ;
//    return "<a href='javascript:duanxin()'>" + tel + "</a>"
//}
//function datetime(rowdata) {
//    var timedate = rowdata.senddate ;
//    return "<a href='javascript:duanxin()'>" + date_riqi(timedate, 1) + "</a>"
//}

//function duanxin() {
//    var state1=manager.getSelectedRow().state;
//    //alert(state1);
//    var phone = manager.getSelectedRow().phone;
//    //alert(phone);
//    var senddate = manager.getSelectedRow().senddate;
//    //alert(senddate);
//    var smscontent = manager.getSelectedRow().smscontent;
//    //alert(smscontent);
//
//    //$("#qqhj_nr").html('');
//    var div = $("#qqhj_nr");
//    if (div.innerHTML == '') {
//        $("#qqhj_nr").append(
//            "<p><b>" + state1 + "号码：</b>" + "<span>" + phone + "</span></p>"
//            + "<p><b>时间：</b>" + "<span>" + date_riqi(senddate, 1) + "</span></p>" +
//            "<p><b>内容：</b>" + "<span>" + smscontent + "</span></p>"
//        );
//    } else {
//        $("#qqhj_nr").html('');
//        $("#qqhj_nr").append(
//            "<p><b>" + state1 + "号码：</b>" + "<span>" + phone + "</span></p>"
//            + "<p><b>时间：</b>" + "<span>" + date_riqi(senddate, 1) + "</span></p>" +
//            "<p><b>内容：</b>" + "<span>" + smscontent + "</span></p>"
//        );
//    }
//}
//2016-3-31 gird显示加分页 --end




//        $(function ()
//        {
//            var url = '/api/xinxi/qinqingduanxin/list/'+id;
//            $.getJSON(url, function(res){
//                var arry=res.items;
//                if(arry.length==0){
//                    $(".padding").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
//                } else {
//                    var duanxin = res.items;
//                    for(var i=0;i<duanxin.length;i++){
//
//                        $("#qqhuijian_phone").append(
//                            "<li><a><b>类型:"+res.items[i].state+"  号码:</b>" +duanxin[i].phone+"      " +
//
//                            "<b>时间：</b>"+date_riqi(duanxin[i].senddate,1)+"</a></li>");
//                    };
//                    var ul=$("#qqhuijian_phone");
//                    var ul_lis=$("#qqhuijian_phone>li");
//                    for (var i = 0;i < ul_lis.length; i++) {
//                        ul_lis[i].index = i;
//                        ul_lis[i].onclick=function(){
//                            var j=this.index;
////                    var newId = duanxin[j].id;//这样直接获得就可以了
////                	alert(j+"//这是第"+j+"条短信"+newId);
//                            /////////////////////////事件处理
//                            //var div = document.getElementById("");
//                            var div = $("#qqhj_nr");
//                            if(div.innerHTML==''){
//                                $("#qqhj_nr").append(
//                                    "<p><b>"+res.items[j].state+"号码：</b>"+"<span>"+duanxin[j].phone+"</span></p>"
//                                    +"<p><b>时间：</b>"+"<span>"+date_riqi(duanxin[j].senddate,1)+"</span></p>"+
//                                    "<p><b>内容：</b>"+"<span>"+duanxin[j].smscontent+"</span></p>");
//                            }else{
//                                //document.getElementById('qqhj_nr').innerHTML='';
//                                $("#qqhj_nr").html('');
//                                $("#qqhj_nr").append(
//                                    "<p><b>"+res.items[j].state+"号码：</b>"+"<span>"+duanxin[j].phone+"</span></p>"
//                                    +"<p><b>时间：</b>"+"<span>"+date_riqi(duanxin[j].senddate,1)+"</span></p>"+
//                                    "<p><b>内容：</b>"+"<span>"+duanxin[j].smscontent+"</span></p>");
//                            };
//                        };//右侧事件处理结束
//                    };//绑定事件结束
//                }
//            });
//        })

