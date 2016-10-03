var manager;

$(function () {

    var id = window.parent.wei.selectedCriminal;
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {
                        display: '购买日期', name: 'gmrq', width: 100, align: 'left', type: 'date'
//                    totalSummary:{
//						align : 'left',
//						type : '',
//						render : function(e){
//						    return "<div><input type='button' onclick='setBenyue()' value='查看本月购物记录'></button></div>";
//					    }
//					}
                    },
                    {display: '商品名称', name: 'spmc', width: 180, align: 'left'},
                    {display: '购买渠道', name: 'spgg', width: 100, align: 'left'},
                    {
                        display: '单价', name: 'price', width: 50, align: 'left',
                        render: function (rowdata, value) {

                            var price = rowdata.price;
                            var jj = parseFloat(price) / 10;
                            return jj;
                        }
                    },
                    {
                        display: '数量', name: 'amount', width: 50, align: 'left',
                        render: function (rowdata, value) {

                            var j = rowdata.amount;
                            var jj = parseFloat(j) / 10;
                            return jj;
                        }

                    },
                    {
                        display: '金额', name: 'je',width: 80, align: 'left',
                        render: function (rowdata, value) {
                            /**
                             var dd=manager.getRow(value-1);
                             var s=JSON.stringify(dd);
                             console.log("pre rowdata:" + s);
                             var str=JSON.stringify(rowdata);
                             console.log(" rowdata:" + str);
                             console.log(" value:" + value);
                             */
                            var j = rowdata.je
                            var jeValue = parseFloat(j) / 100;
                            return jeValue;
                        }

                    }
                ],
                height: '96%',
                width: '47%',
                pageSize: 20,
                pageSizeOptions: [20, 50, 100],
                record: 'total',
                url: '/api/xinxi/chaoshigouwu/list/' + id,//本月购物记录
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
            onBeforeShowData: function () {
                $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
                    var html = "超市购物　　"+"当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
                    //alert(res.dabh)
                    if ("fenjianqu" in res&&null!==res.fenjianqu){
                        html = html + " | 分监区："+res.fenjianqu.name;
                    }
                    $('#title').html(html);
                });
            },
            onLoaded: function () {
                var arry = this.data;
                //console.log(arry);
                if (arry.items.length == 0) {
                    $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>未找到该犯生活科帐户,请添加该犯帐户</b>");

                }
            }
            }
        );
    $(".l-grid-loading").remove();
});


//本月购物记录
function setBenyue() {
    var get_id = window.parent.wei.selectedCriminal;
    if (null == get_id) {
        alert("请选择相关犯人")
    } else {
        var url = '/api/xinxi/chaoshigouwu/currentlist/' + get_id;
            manager.set('url', url);
        manager = $("#maingrid").ligerGrid({
            onLoaded: function () {
                var arry = this.data;
                //console.log(arry);
                if (arry.items.length == 0) {
                    $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");

                }
            }
        })
    }

}
//全部购物
function setAll() {
    var get_id = window.parent.wei.selectedCriminal;
    if (null == get_id) {
        alert("请选择相关犯人")
    } else {
        var url = '/api/xinxi/chaoshigouwu/list/' + get_id;
        manager.set('url', url);
        manager = $("#maingrid").ligerGrid({
            onLoaded: function () {
                var arry = this.data;
                //console.log(arry);
                if (arry.items.length == 0) {
                    $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>未找到该犯生活科帐户,请添加该犯帐户</b>");

                }
            }
        })
    }


}
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
                //var jeValue = parseFloat(data)/100;
                var str_data;
                //alert("这是舍去两位数后＝"+data.substr(0,data.length-2))//10200.00
                //alert("这是最后一位数＝"+data.substr(data.length-1,data.length));
                //alert("这是倒数第二位数＝"+data.substr(data.length-2,1));
                //alert("这是最后两位数="+data.substr(data.length-2,2));
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

//购物合计//这里没有使用api的合计金额；使用的是组件里的求和
//        $.getJSON("/api/xinxi/chaoshigouwu/gouwuheji/"+get_id,function(data){
//                var gouwuheji = document.getElementById("heji");
//                if(gouwuheji.innerHTML==""){
//                    gouwuheji.innerHTML=data+"元";
//                }else{
//                    gouwuheji.innerHTML="";
//                }
//            });
