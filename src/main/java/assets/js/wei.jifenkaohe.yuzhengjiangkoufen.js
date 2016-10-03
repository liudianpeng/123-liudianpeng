var manager;
var circleId = window.parent.document.getElementById("postId").value;
//console.log(circleId)
$(function ()
{
    var jianquId = document.getElementById("jianquId").value;
    $.getJSON('/api/jifenkaohe/yuzhengke/yuzhengjiangkoufen/get/'+circleId+"/"+jianquId,function(res){
        window['g'] =
            manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'cid', type: 'int', width: 70, minWidth: 80, align: 'center'},
                    {display: '姓名', name: 'name', minWidth: 90, width:90,align: 'center', type: 'text'},
                    {display: '奖分', name: 'jk', width: 100, minWidth: 70, align: 'center', type: 'currency',
                        editor: {type: "currency"},
                        totalSummary: {
                            name: '总分',
                            type: 'sum',
                            render: function (e) {
                                return "<div>小计:" + e.sum + "</div>";
                            }
                        }
                    },
                    //此处与联动有关，不同的项目产生奖分或者扣分
                    {display: '奖扣说明', name: 'jksm', minWidth: 100, type: 'text', align: 'center',
                        editor: {type: 'text'}},
                    {display: '单据号码', name: 'djhm', minWidth: 90, type: 'text', align: 'center',
                        editor: {type: 'int'}},
                    {display: '单据摘要', name: 'djzy', minWidth: 90, type: 'text', align: 'center',
                        editor: {type: 'text'}}
                ],
                onSelectRow: function (rowdata, rowindex) {
                    $("#txtrowindex").val(rowindex);
                },
                toolbar: {
                    items: [
                        {text: '保存', click: saveItem, icon: 'save'},
                        {text: '提交', click: pupItem, icon: 'save'}
                    ]
                },
                checkbox: false,
                isSingleCheck: false,
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [20, 50, 100],
                width: '100%',
                //height: '97%',
                pageSize: 20,
                record: 'total',
                //url: '/api/jifenkaohe/yuzhengke/yuzhengjiangkoufen/get/'+circleId+"/"+jianquId,
                dataAction: 'server', //服务器处理
                root: 'items',
                //usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                data: $.extend(true,{},res),
                usePager: false,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                },
                where : f_getWhere()
            });

    //判断是否已经提交
    $.ajax({
        type: "GET",
        url: '/api/jifenkaohe/yuzhengke/yuzhengjiangkoufen/panduan/'+jianquId,
        success: function (panduan) {
            if (panduan.notice == "true") {
                manager = $("#maingrid").ligerGrid({
                    enabledEdit: true,
                    clickToEdit: true
                });
            } else {
                $('.jifenbutton').show();
                $("#pass").click(function(){
                    $.ajax({
                        type: 'GET',
                        url: '/api/jifenkaohe/yuzhengke/yuzhengjiangkoufenshenhe/'+jianquId,
                        success: function(res){
                            if (res.notice == "审核通过"){
                                $.ligerDialog.alert('该监区已审核通过,请不要重复审核!', '提示');
                            }else if (res.notice == "审核未通过"){
                                $.ligerDialog.alert('该监区数据已驳回,请等待提交!', '提示');
                            }else {
                                window.parent.manager.reload();
                                $(".notice").html('审核通过');
                            }
                        }
                    });
                });
                $("#nopass").click(function(){
                    $.ajax({
                        type: 'GET',
                        url: '/api/jifenkaohe/yuzhengke/yuzhengjiangkoufenbohui/'+jianquId,
                        success: function(res){
                            if (res.notice == "审核通过"){
                                $.ligerDialog.alert('该监区已审核通过,请不要重复审核!', '提示');
                            }else if (res.notice == "审核未通过"){
                                $.ligerDialog.alert('该监区数据已驳回,请等待提交!', '提示');
                            }else {
                                window.parent.manager.reload();
                                $(".notice").html('驳回成功');
                                //$('.jifenbutton').hide();
                                manager = $("#maingrid").ligerGrid({
                                    enabledEdit: true,
                                    clickToEdit: true
                                });
                            }
                        }
                    });
                });
                //$.ligerDialog.alert('狱政科该数据已提交!', '提示');
                manager = $("#maingrid").ligerGrid({
                    enabledEdit: false,
                    clickToEdit: false,
                    toolbar:null
                });
            }
        }
    });
    /**
     *键盘回车进入下一项编辑
     */
    $(document).bind('keydown.grid', function (event)
    {
        if (event.keyCode == 13) //enter,也可以改成9:tab
        {
            g.endEditToNext();
        }
    });
//保存
    function saveItem() {
        var data = manager.getData();
        //console.log(data);
        var newdata = [];
        $.each(data,function(index,value){
            var obj = {
                cid:kongzhi(data[index].cid),
                jk:data[index].jk===undefined||data[index].jk===""?0.00:data[index].jk,
                jksm:kongzhi(data[index].jksm),
                djhm:kongzhi(data[index].djhm),
                djzy:kongzhi(data[index].djzy)
            };
            obj = JSON.stringify(obj);
            newdata.push(obj);
        });
        //console.log(newdata);
        $.ajax({
            type: 'POST',
            url: '/api/jifenkaohe/yuzhengke/Yuzhengjiangkoufen/create/'+jianquId,
            data:{"dt":newdata},
            success: function(res){
                if (res == "操作成功") {
                    $(".notice").html('录入成功！');
                    window.parent.manager.reload();
                }else if (res.notice) {
                    $.ligerDialog.alert(res.notice, '提示');
                }

            }
        });
    }
    function pupItem(){
    //判断是否已经提交
    $.ajax({
        type: "GET",
        url: '/api/jifenkaohe/yuzhengke/yuzhengjiangkoufen/panduan/'+jianquId,
        success: function (res) {
            if (res.notice == "true") {
                //提交
                $.ligerDialog.confirm('提交数据将不再修改?', function (e) {
                    if (e) {
                        $.ajax({
                            type: 'GET',
                            url: '/api/jifenkaohe/yuzhengke/yuzhengjiangkoufentijiao/'+jianquId,
                            success: function (res) {
                                if (res.tijiao == "error") {
                                    $.ligerDialog.alert('您还未保存,请先保存！', '提示');
                                } else {
                                    $(".notice").html('您已提交数据，不可再更改');
                                    manager = $("#maingrid").ligerGrid({
                                        enabledEdit: false,
                                        clickToEdit: false
                                    });

                                }
                            }
                        });
                        window.parent.manager.reload();
                    } else {
                        $.ligerDialog.alert('取消提交！', '提示');
                    }
                });

            } else {
                $.ligerDialog.alert('狱政科该数据已提交!', '提示');
                manager = $("#maingrid").ligerGrid({
                    enabledEdit: false,
                    clickToEdit: false
                });
            }
        }
    })

}
});
});
function f_search()
{
    manager.options.data = $.extend(true, {},manager.options.data);
    manager.loadData(f_getWhere());
}
function f_getWhere()
{
    if (!manager) return null;
    var clause = function (rowdata, rowindex)
    {
        var key = $("#txtKey").val();
        return rowdata.name.indexOf(key) > -1;
    };
    return clause;
}





