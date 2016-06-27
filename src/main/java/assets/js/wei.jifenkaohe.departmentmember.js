var manager;
$(function ()
{
    window['g'] =
        manager = $("#maingrid").ligerGrid({

            columns: [
                { display: '编号', name: 'id', width: 100,minWidth:120, align: 'center' },
                { display: '部门', name: 'name', minWidth : 100, align: 'center' },
                { display: '考核责任人', name: 'kaoheMembers',minWidth :330,align: 'center',isSort:false,type:'text',render:kaoheMembers },
                { display: '创建时间', name: 'created', minWidth : 100, type:'rizhi_date',align: 'center' },
                { display: '状态', name: 'stateName', minWidth : 100,  align: 'center' }
            ],
            toolbar: { items: [
                { text: '设置部门考核责任人', click: setMembers, icon: 'add' }
            ]
            },
            checkbox:true,
            isSingleCheck:true,
            pageSizeOptions: [20, 50, 100],
            width: '100%',
            height: '97%',
            pageSize: 20,
            record: 'total',
            url: '/api/xitongguanli/department/members/list',
            dataAction: 'server', //服务器处理
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            onBeforeShowData: function ()
            {
            },
            onAfterShowdata: function ()
            {
            }
        });
    $("#pageloading").hide();
});

function kaoheMembers(rowdata, value){
    if(rowdata.kaoheMembers==null){
        return null;
    }else{
        var value='';
        for(i=0;i<rowdata.kaoheMembers.length;i++){
            value+=rowdata.kaoheMembers[i].nickname+'&nbsp;'
        }
        return value;
    }
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
function reload()
{
    manager.reload(1);
}

function setMembers(){
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ligerDialog.open({
        height:400,
        width: 500,
        title : '设置部门负责人',
        url: '/xitongguanli/department/setmembers',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            id: selectedId
        }
    });
}

function archiveItem(){

}

