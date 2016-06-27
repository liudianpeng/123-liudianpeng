var manager;
var circleId = window.parent.document.getElementById("postId").value;
//console.log(circleId)
$(function () {
    var jianquid = document.getElementById("jianquId").value;
    $.getJSON('/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/get/' + circleId + "/" + jianquid,function(res){
        window['g'] =
            manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'cid', minWidth: 70, width: 70, align: 'center', editor: {type: 'int'}},
                    {
                        display: '姓名',
                        name: 'name',
                        minWidth: 70,
                        width: 70,
                        align: 'center',
                        type: 'text',
                        editor: {type: 'text'}
                    },
                    {
                        display: '裁定日期', name: 'cdrq', minWidth: 70, align: 'center', type: 'date',
                        editor: {type: 'date'},render:function(rowdata){
                        var date=rowdata.cdrq;

                        if(typeof(date) == "undefined") {
                            return "";
                        }else{
                            return date;
                        }
                    }
                    },
                    {
                        display: '幅度', name: 'fudu', minWidth: 70, align: 'center', type: 'currency',
                        editor: {type: 'currency'}
                    }
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
                isSingleCheck: false,
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [20, 50, 100],
                width: '100%',
                height: '97%',
                pageSize: 20,
                usePager: false,
                checkbox: false,
                //url: '/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/get/' + circleId + "/" + jianquid,
                root: 'items',
                data: $.extend(true,{},res),
                method: 'get',
                where : f_getWhere(),
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            });


    //判断是否已经提交
    $.ajax({
        type: "GET",
        url: '/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/panduan/' + jianquid,
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
                        url: '/api/jifenkaohe/yuzhengke/yuzhengfjianxingjiashihenhe/'+jianquid,
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
                        url: '/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashibohui/'+jianquid,
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
//保存
    function saveItem() {
        var data = manager.getData();
        //console.log(data);
        var newdata = [];
        $.each(data, function (index, value) {
            var obj = {
                cid: kongzhi(data[index].cid),
                fudu: data[index].fudu === undefined || data[index].fudu === "" ? 0.00 : data[index].fudu,
                cdrq: date_riqi(data[index].cdrq,0)//这里需要处理以下日期,还未处理
            };
            obj = JSON.stringify(obj);
            newdata.push(obj);
        });
        //console.log(newdata);
        $.ajax({
            type: 'POST',
            url: '/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/create/' + jianquid,
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
function Datechuli(){

}
    function reload() {
        manager.reload(1);
    }

    function pupItem() {
        //判断是否已经提交
        $.ajax({
            type: "GET",
            url: '/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/panduan/' + jianquid,
            success: function (res) {
                if (res.notice == "true") {
                    //提交
                    $.ligerDialog.confirm('提交数据将不再修改?', function (e) {
                        if (e) {
                            $(".notice").html('您已提交数据，不可再更改');
                            $.ajax({
                                type: 'GET',
                                //tijiao api
                                url: '/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashitijiao/' + jianquid,
                                success: function (res) {
                                    if (res.tijiao == "error") {
                                        $.ligerDialog.alert('您还未保存,请先保存！', '提示');
                                    } else {
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




