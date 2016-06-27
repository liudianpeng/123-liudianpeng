var manager;
var circleId = window.parent.document.getElementById("postId").value;
//console.log(circleId)
$(function () {
    var jianquid = document.getElementById("jianquId").value;
    $.getJSON("/api/jifenkaohe/yuzhengke/yuzhengfengxiandiya/get/" + circleId + '/' + jianquid,function(res){
        window['g'] =
            manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'cid', width: 100, minWidth: 100},
                    {display: '姓名', name: 'name', width: 100},
                    {
                        display: '抵押分',
                        name: 'fen',
                        minWidth: 80,
                        type: 'currency',
                        editor: {type: "currency"},
                        totalSummary: {
                            align: 'left',
                            type: 'sum',
                            render: function (e) {
                                return "<div>抵押分合计:" + e.sum + "</div>";
                            }
                        }
                    },
                    {
                        display: '奖扣', name: 'jiangkou', minWidth: 90, textField: 'jiangkou', editor: {
                        type: 'select',
                        data: [
                            {text: '+', id: '1'},
                            {text: '-', id: '2'}
                        ]
                    }
                    }
                ],
                toolbar: {
                    items: [
                        {text: '保存', click: saveItem, icon: 'save'},
                        {text: '提交', click: pupItem, icon: 'save'}

                    ]
                },
                isScroll: false,
                checkbox: false,
                isSingleCheck: false,//是否单选
                switchPageSizeApplyComboBox: true,//切换每页记录数的时候的下拉框是否使用
                pageSizeOptions: [20, 50, 100],
                width: '100%',
                height: '97%',
                pageSize: 20,
                data: $.extend(true,{},res),
                root: 'items',
                record: 'total',//数据源字段名字
                dataAction: 'server', //服务器处理,提交数据的方式：本地(local)或(server)
                usePager: false,       //服务器分页
                alternatingRow: true,//是否附加奇偶行效果行
                method: 'get',//服务器提交方式
                pagesizeParmName: 'limit',//页记录数参数名，(提交给服务器)
                //显示数据前事件
                onBeforeShowData: function () {
                },
                //显示数据后事件
                onAfterShowdata: function () {
                },
                onSelectRow: function (rowdata, rowindex) {
                    $("#txtrowindex").val(rowindex);
                },

                where : f_getWhere()

            });


    //判断是否已经提交
    $.ajax({
        type: "GET",
        url: '/api/jifenkaohe/yuzhengke/yuzhengfengxiandiya/panduan/'+jianquid,
        success: function (res) {
            if (res.notice == "true") {
                manager = $("#maingrid").ligerGrid({
                    enabledEdit: true,
                    clickToEdit: true
                });
            } else {
                $('.jifenbutton').show();
                $("#pass").click(function(){
                    $.ajax({
                        type: 'GET',
                        url: '/api/jifenkaohe/yuzhengke/yuzhengfengxiandiyashenhe/'+jianquid,
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
                        url: '/api/jifenkaohe/yuzhengke/yuzhengfengxiandiyabohui/'+jianquid,
                        success: function(res){
                            if (res.notice == "审核通过"){
                                $.ligerDialog.alert('该监区已审核通过,请不要重复审核!', '提示');
                            }else if (res.notice == "审核未通过"){
                                $.ligerDialog.alert('该监区数据已驳回,请等待提交!', '提示');
                            }else {
                                window.parent.manager.reload();
                                $(".notice").html('驳回成功');
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
    $(document).bind('keydown.grid', function (event) {
        if (event.keyCode == 13) //enter,也可以改成9:tab
        {
            g.endEditToNext();
        }
    });


    /**
     * 保存数据
     */
    function saveItem() {

        var data = manager.getData();
        ///////////////////////////////////////////////////////////
        var newdata = [];
        $.each(data, function (index, value) {
            var obj = {
                cid: kongzhi(data[index].cid),
                diyafen: data[index].fen === undefined || data[index].fen === "" ? 0.00 : data[index].fen,
                jiangkou: kongzhi(data[index].jiangkou)
            };
            obj = JSON.stringify(obj);
            newdata.push(obj);
        });

        $.ajax({
            type: 'POST',
            url: '/api/jifenkaohe/yuzhengke/yuzhengfenxiandiya/create/' + jianquid,
            data: {"dt": newdata},
            success: function (res) {
                if (res == "操作成功") {
                    $(".notice").html('录入成功！');
                    window.parent.manager.reload();
                } else if (res.notice) {
                    $.ligerDialog.alert(res.notice, '提示');
                }
            }
        });
    }

    function pupItem() {
        //判断是否已经提交
        $.ajax({
            type: "GET",
            url: '/api/jifenkaohe/yuzhengke/yuzhengfengxiandiya/panduan/' + jianquid,
            success: function (res) {
                if (res.notice == "true") {
                    //提交
                    $.ligerDialog.confirm('提交数据将不再修改?', function (e) {
                        if (e) {
                            $.ajax({
                                type: 'GET',
                                url: '/api/jifenkaohe/yuzhengke/shujutijiao/' + jianquid,
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


/**
 * 刷新数据
 */
function reload() {
    manager.reload(1);
}




