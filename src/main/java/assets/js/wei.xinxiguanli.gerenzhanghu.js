var manager;
$(function () {
    var id = window.parent.wei.selectedCriminal;
        window['g'] =
            manager = $("#maingrid").ligerGrid({
                    columns: [
                        {display: '单据日期', name: 'djrq', width: 100, align: 'left', type: 'date'},
                        {display: '单据摘要', name: 'djzy', width: 180, align: 'left'},
                        {display: '金额', name: 'je', width: 100, align: 'left'},
                        {display: '存/支款', name: 'cz', width: 100, align: 'left'},
                        {display: '付款方式', name: 'payment', width: 100, align: 'left'}

                    ],
                    pageSizeOptions: [10, 20, 50, 100],
                    height: '97%',
                    width: '50%',
                    pageSize: 20,
                    record: 'total',
                    url: '/api/xinxi/gerenzhanghu/list/' + id,
                    dataAction: 'server', //服务器处理
                    root: 'items',
                    usePager: true,       //服务器分页
                    alternatingRow: true,
                    method: 'get',
                    pagesizeParmName: 'limit',
                    switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                    $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
                        var html = "个人帐户　　"+"当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
                        //alert(res.dabh)
                        if ("fenjianqu" in res&&null!==res.fenjianqu){
                            html = html + " | 分监区："+res.fenjianqu.name;
                        }
                        $('#title').html(html);
                    });
                },
                    onLoaded: function () {
                        var arry = this.getData();
                        //console.log(arry);
                        if (arry.length == 0) {
                            $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                            $(".l-grid-loading").remove();
                        }
                    }
                }
            );
});


function getSelected() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请选择行');
        return;
    }
    alert(JSON.stringify(row));
}
function reload() {
    manager.reload(1);
}

//账户余额
$(function () {
    //帐户余额
    var get_id = window.parent.wei.selectedCriminal;
    if (null == get_id) {
        alert("请选择相关犯人")
    } else {
        $.getJSON("/api/xinxi/chaoshigouwu/zhanghuyue/" + get_id, function (data) {
            if (data.error == "not found") {
                $("#yue").html("<b>0</b>");
            } else {
                var str_data;
                if (data.substr(data.length-2,2)=='00'){
                    str_data=data.substr(0,data.length-2)
                }else if (data.substr(data.length-1,data.length)==0){
                    str_data=data.substr(0,data.length-2)+"."+data.substr(data.length-2,1)
                }else {
                    str_data=data.substr(0,data.length-2)+"."+data.substr(data.length-2,2)
                }
                $("#yue").html(str_data);
            }
        });
    }
});

