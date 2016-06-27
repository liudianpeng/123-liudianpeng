var manager;
var grid=[];
$(function ()
{
    $.ligerDefaults.Grid.formatters['enabled'] = function (value, column) {
        if(value.toString()=='true'){
            return  '<font color=blue ><b>启用</b></font>';
        }else{
            return  '<font color=red ><b>禁用</b></font>';
        }
    };
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    { display: '编号', name: 'id', width: 100, align: 'center',type:'int',isSort:true},
                    { display: '一级单据', name: 'parent.name',minWidth :230,  align: 'center',render:parentNullyiji},
                    { display: '二级单据', name: 'name',minWidth :230,  align: 'center',render:parentNull},
                    { display: '状态', name: 'enabled', type:'enabled', align: 'center',isSort:false }
                ],
                toolbar: { items: [
                    { text: '添加单据类别', click: addItem, icon: 'add' },
                    { line: true },
                    {text: '添加二级单据类别', click: adddevItem, icon: 'add'},
                    {line:true},
                    { text: '编辑', click: editItem, icon: 'modify' },
                    { text: '启用', click: enable, icon: 'delete' },
                    { line: true },
                    { text: '禁用', click: disable, icon: 'delete' }
                ]},
                pageSize: 20,
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                url: '/api/jifenkaohe/jiangkoudanjuleibie/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                record: 'total',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                checkbox:true,
                isSingleCheck:true,
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function ()
                {
                },
                onAfterShowdata: function ()
                {
                }
            }
        );
});


function parentNull(rowdata){
    if(rowdata.parent==null){
        return '';
    }else{
        return rowdata.name;
    }
}
function parentNullyiji(rowdata){
    if(rowdata.parent==null){
        return rowdata.name;
    }else{
        return rowdata.parent.name;
    }
}
function getSelectedId()
{
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请选择一级单据');
        return;
    }
    return row.id;
}
function reload()
{
    manager.reload(1);
}

function enable(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/jifenkaohe/jiangkoudanjuleibie/enabled/'+selectedId,

        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
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
        url: '/api/jifenkaohe/jiangkoudanjuleibie/disabled/'+selectedId,

        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                reload();

            }else{
                alert(res.message);
                $('.notice').html(res.message);
            }
        }
    });
}



function addItem(){
    $.ligerDialog.open({
        height:250,
        width: 400,
        title : '添加单据类别',
        url: '/jifenkaohe/peizhi/jiangkoudanjuleibie/newDanjuleibie',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false
    });
}
function editItem(){
    var id = getSelectedId();
    if(!id){
        return;
    }
    $.ligerDialog.open({
        height:300,
        width: 500,
        title: '编辑单据类别',
        data: {
            id: id
        },
        url: '/jifenkaohe/peizhi/jiangkoudanjuleibie/updateDanjuleibie/'+id,
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false
    })
}
function adddevItem(){
    var id = getSelectedId();
    if(!id){
        return;
    }
    $.ligerDialog.open({
        height:300,
        width: 400,
        title : '添加二级奖扣单据类别',
        url: '/jifenkaohe/peizhi/jiangkoudanjuleibie/adddev/'+id,
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false
    });
}
