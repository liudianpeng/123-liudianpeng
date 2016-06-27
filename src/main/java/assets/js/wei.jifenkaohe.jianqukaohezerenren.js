var manager;
$(function ()
{
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                { display: '编号', name: 'id', width: 100, align: 'center',type:'int'},
                { display: '监区名称', name: 'name',width: 100,  minWidth :100,align: 'center',type:'text' },
                { display: '考核责任人', name: 'kaoheMembers',minWidth :100,isSort:false,align: 'center',type:'text' },
                { display: '创建时间', name: 'created',minWidth :100,align: 'center',type:'date' }
            ],
            toolbar: { items: [
                { text: '设定监区考核责任人', click: setItem, icon: 'add' }

            ]},
            checkbox:true,
            fixedCellHeight :false,
            alternatingRow :true,
            isSingleCheck:true,
            width:'100%',
            pageSize: 20,
            pageSizeOptions: [10,20,30,50, 100],
            height: '97%',
            url: '/api/jifenkaohe/jianquzerenren/list',
            method:'get',
            dataAction: 'server', //服务器处理
            root: 'items',
            record: 'total',
            usePager: true,       //服务器分页
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            onBeforeShowData: function ()
            {
            },
            onAfterShowdata: function ()
            {
            }
        });
});

function kaoheMembers(rowdata, value){
    if(rowdata.kaoheMembers==null){
        return null;
    }else{
        var value='';
        for(var i=0;i<rowdata.kaoheMembers.length;i++){
            value+=rowdata.kaoheMembers[i].nickname+'&nbsp;'
        }
        return value;
    }
}
function getSelectedId()
{
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请选择监区');
        return;
    }
    return row.id;
}
function reload()
{
    manager.reload(1);
}


function setItem(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ligerDialog.open({
        height: 400,
        width: 500,
        title: '设定监区考核责任人',
        url: '/jifenkaohe/peizhi/setJianqukaohezerenren',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            id: selectedId
        }
    })
}

