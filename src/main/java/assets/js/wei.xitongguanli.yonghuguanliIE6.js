var manager;



function itemclick(item)
{
    alert(item.text);
}
function itemAddClick(item)
{
    var m = $.ligerDialog.open({
        url: '/xitongguanli/yonghuguanli/new',
        title: '增加用户',
        height: 300,
        width: 430,
        isResize: true
    });

}

function enable(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/xitongguanli/member/enabled/'+selectedId,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                $(".notice_sucess").addClass("alert-success");
                $(".notice_sucess").addClass("alert");
                $(".notice_sucess").html("启用成功！");
                reload();
            }else{
                $('.notice').html(res.message);
            }
        }
    });


}
function disable(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/xitongguanli/member/disabled/'+selectedId,

        success: function (res) {
//            res = JSON.parse(res);
            if (res.notice == 'success') {
                $(".notice_sucess").addClass("alert-success");
                $(".notice_sucess").addClass("alert");
                $(".notice_sucess").html("禁用成功！");
                reload();
            } else {
                $('.notice').html(res.message);
            }
        }
    });


}


$(function ()
{
    $.ligerDefaults.Grid.formatters['enabled'] = function (value, column) {
        if(value.toString()=='true'){
            return  '<font color="blue" ><b>启用</b></font>';
        }else{
            return  '<font color="red" ><b>禁用</b></font>';
        }
    };
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    { display: '编号', name: 'id', width: 100, align: 'center',isSort:true },
                    { display: '用户名', name: 'username', minWidth: 100, align: 'center',isSort:true },
                    { display: '邮箱', name: 'email', minWidth: 100, align: 'center',isSort:true },
                    { display: '姓名', name: 'nickname', minWidth: 100,  align: 'center',isSort:true },
                    { display: '用户组', name: 'groups', minWidth: 100,width: 150, align: 'center' ,render:groups,isSort:false},
                    { display: '创建时间', name: 'created', minWidth: 100,  align: 'center',type:'date',isSort:true },
                    { display: '状态', name: 'enabled', type:'enabled',minWidth: 100, align: 'center',isSort:false }
                ],
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '99.9%',
                pageSize: 20,
                record: 'total',
                url: '/api/xitongguanli/member/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                fixedCellHeight:false,
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                rownumbers:true,
                toolbar: { items: [
                    { text: '增加', click: itemAddClick, icon: 'add' },
                    { line: true },
                    { text: '编辑', click: editItem, icon: 'modify' },
                    { line: true },
                    { text: '启用', click: enable, icon: 'delete' },
                    { line: true },
                    { text: '禁用', click: disable, icon: 'delete' },
                    { line: true },
                    { text: '修改密码', click: modPass, icon: 'modify' },
                    { line: true },
                    { text: '设定用户组', click: setGroup, icon: 'modify' }
                ]},
                onBeforeShowData: function ()
                {
                },
                onAfterShowdata: function ()
                {
                }
            }
        );
});
//获取用户组集合
function groups(rowdata){
    if(rowdata.groups==null){
        return '';
    }else{
        var value='';
        for(var i=0;i<rowdata.groups.length;i++){
            value+=rowdata.groups[i].name+'&nbsp;'
        }
        return value;
    }
}
function reload()
{
    manager.reload(1);
}

function getSelectedId()
{
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请先选择一行');
        return;
    }
    return row.id;
}

function modPass() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 300,
        width: 450,
        title: '修改密码',
        url: '/xitongguanli/yonghuguanli/password',
        showMax: false,
        showToggle: false,
        showMin: false,
        isResize: false,
        slide: false,
        data: {
            id: selectedId
        }
    })
}
function editItem(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ligerDialog.open({
        height:350,
        width: 430,
        title: '编辑用户',
        url: '/xitongguanli/yonghuguanli/edit',
        showMax: false,
        showToggle: false,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            id: selectedId
        }
    })
}
//设定用户组
function setGroup(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ligerDialog.open({
        height: 400,
        width: 480,
        title: '设定用户组',
        url: '/xitongguanli/yonghuguanli/setgroup/'+selectedId,
        showMax: false,
        showToggle: false,
        showMin: false,
        isResize: false,
        slide: false,
        data: {
            id: selectedId
        }
    })
}

