var manager;
var circleId = window.parent.document.getElementById("postId").value;
//console.log(circleId)
$(function ()
{
    var id = document.getElementById("postId").value;
    $.getJSON('/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilu/get/'+circleId+'/'+id,function(res){
        window['g'] =
            manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编码', name: 'cid', minWidth: 50, align: 'center'},
                    {display: '姓名', name: 'name',width:80, minWidth: 80, align: 'center'},
                    //{display: '判决地方',name: 'pjdf', minWidth: 100, type: 'text', align: 'center'},
                    //{display: '判决法院',name: 'pjfy',minWidth: 100, type: 'text', align: 'center'},
                    //{display: '奖惩类别', name: 'jclb', minWidth: 100, type: 'text', align: 'center'}
                    {display: '奖惩日期', name: 'jcrq', type: 'date',  minWidth: 70, align: 'center',
                        editor: {type: 'date'},render:function(rowdata){
                        var date=rowdata.jcrq;

                        if(typeof(date) == "undefined") {
                            return "";
                        }else{
                            return date;
                        }
                    }
                    },
                    {display: '裁定日期', name: 'cdrq',type: 'date',minWidth: 70,align: 'center',
                        editor: {type: 'date'},render:function(rowdata){
                        var date=rowdata.cdrq;

                        if(typeof(date) == "undefined") {
                            return "";
                        }else{
                            return date;
                        }
                    }
                    },
                    {display: '变动分数', name: 'bdfs', minWidth: 50, align: 'center', type: 'currency',
                        editor: {type: "currency"}
                    },
                    {display: '变动记功数', name: 'bdjgs', minWidth: 50, align: 'center', type: 'currency',
                        editor: {type: 'currency'}},
                    {display: '变动表杨数', name: 'bdbys', minWidth: 50, align: 'center',type: 'currency',
                        editor: {type: 'currency'}},
                    {display: '幅度', name: 'fd', minWidth: 50, align: 'center',type: 'currency',
                        editor: {type: 'currency'}},
                    {display: '合并刑期',name: 'hbxq',minWidth: 50,align:'center',editor:{type: 'text'}},
                    {display: '现刑起日', name: 'xxqr', minWidth: 70, align: 'center',type: 'date',
                        editor: {type: 'date'},render:function(rowdata){
                        var date=rowdata.xxqr;

                        if(typeof(date) == "undefined") {
                            return "";
                        }else{
                            return date;
                        }
                    }
                    },
                    {display: '现刑止日', name: 'xxzr', minWidth: 70, align: 'center',type: 'date',
                        editor: {type: 'date'},render:function(rowdata){
                        var date=rowdata.xxzr;

                        if(typeof(date) == "undefined") {
                            return "";
                        }else{
                            return date;
                        }
                    }
                    },
                    //{ display: '现拨正', name: 'xbz',type:'text', width: 90,minWidth:90, align: 'center', editor:{type:'text'} },
                    //{ display: '调出部门', name: 'dcbm',type:'text', width: 90,minWidth:90, align: 'center', editor:{type:'text'} },
                    {display: '备注', name: 'bz', type: 'text',  minWidth: 50, align: 'center',
                        editor: {type: 'text'}
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
                checkbox: false,
                isSingleCheck: false,
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [20, 50, 100],
                width: '100%',
                height: '97%',
                pageSize: 20,
                data: $.extend(true,{},res),
                record: 'total',
                //url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilu/get/'+circleId+'/'+id,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,        //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                },
                where : f_getWhere()

            });


    //判断是否已经提交
    $.ajax({
        type: "GET",
        url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilu/panduan/'+id,
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
                        url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilushenhe/'+id,
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
                        url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilubohui/'+id,
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
    function saveItem()
    {
        var data = manager.getData();
        //console.log(data);
        var newdata = [];
        $.each(data,function(index,value){
            var obj = {
                cid:kongzhi(data[index].cid),
                //jcrq:data[index].jcrq,
                jcrq:date_riqi(data[index].jcrq,0),
                cdrq:date_riqi(data[index].cdrq,0),
                bdfs:data[index].bdfs===undefined||data[index].bdfs===""?0.00:data[index].bdfs,
                bdjgs:data[index].bdjgs===undefined||data[index].bdjgs===""?0.00:data[index].bdjgs,
                bdbys:data[index].bdbys===undefined||data[index].bdbys===""?0.00:data[index].bdbys,
                fd:data[index].fd===undefined||data[index].fd===""?0.00:data[index].fd,
                hbxq:data[index].hbxq===undefined||data[index].hbxq===""?0.00:data[index].hbxq,
                xxqr:date_riqi(data[index].xxqr,0),
                xxzr:date_riqi(data[index].xxzr,0),
                bz:data[index].bz===undefined||data[index].bz===""?0.00:data[index].bz
            };
            obj = JSON.stringify(obj);
            newdata.push(obj);
        });
        //console.log(newdata);
        $.ajax({
            type: 'POST',
            url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilu/create/'+id,
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
    function pupItem() {
        //判断是否已经提交
        $.ajax({
            type: "GET",
            url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilu/panduan/'+id,
            success: function (res) {
                if (res.notice == "true") {
                    //提交
                    $.ligerDialog.confirm('提交数据将不再修改?', function (e) {
                        if (e) {
                            $.ajax({
                                type: 'GET',
                                url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilutijiao/'+id,
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
function getSelectedId()
{
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请先选择一行');
        return;
    }
    return row.id;
}
function reload()
{
    manager.reload(1);
}


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



