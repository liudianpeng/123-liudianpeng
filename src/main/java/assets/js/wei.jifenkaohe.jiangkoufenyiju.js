var manager;

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
                    { display: '编号', name: 'id', width: 50, align: 'center',isSort:true },
                    { display: '奖扣分依据', name: 'name',align: 'center' },
                    { display: '编码', name: 'code',   align: 'center' },
                    { display: '状态', name: 'enabled', type:'enabled', align: 'center',isSort:false }
                ],
                checkbox:true,
                isSingleCheck:true,
                fixedCellHeight :false,
                pageSizeOptions: [10, 20, 50, 100],
                pageSize: 20,
                height: '97%',
                width: '100%',
                record: 'total',
                url: '/api/jifenkaohe/jiangkoufenyiju/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                toolbar: { items: [
                    { text: '增加', click: itemAddClick, icon: 'add' },
                    { line: true },
                    { text: '编辑', click: editItem, icon: 'modify' },
                    { line: true },
                    { text: '启用', click: enable, icon: 'delete' },
                    { line: true },
                    { text: '禁用', click: disable, icon: 'delete' }
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

function itemclick(item)
{
    alert(item.text);
}

function itemAddClick(item)
{
    var m = $.ligerDialog.open({
        url: '/jifenkaohe/jiangkoufenyijiu/newjiangkoufen',
        title:'添加奖扣分依据',
        height: 250,
        width:350,
        isResize: true
        //buttons: [  ]
    });

}

function enable(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/jifenkaohe/jiangkoufenyiju/enabled/'+selectedId,

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
        url: '/api/jifenkaohe/jiangkoufenyiju/disabled/'+selectedId,

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

function editItem(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ligerDialog.confirm('是否确定修改数据？您要修改的数据将被设置为"禁用"状态,并且会重新为您生成新项', function (e) {
        if (e) {
            disable();
            $.ligerDialog.open({
                height: 250,
                width:350,
                title: '编辑奖扣分依据',
                url: '/jifenkaohe/jiangkoufenyijiu/updatejiangkoufen/'+selectedId,
                showMax: true,
                showToggle: true,
                showMin: false,
                isResize: true,
                slide: false,
                data: {
                    id: selectedId
                }
            })
        } else {
            $.ligerDialog.alert('取消修改！', '提示');
        }
    });

}

function reload()
{
    manager.reload(1);
}
