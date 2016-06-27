var manager;
$(function ()
{
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                { display: '编号', name: 'id', width: 100, align: 'center',type:'int'},
                { display: '分监区监区名称', name: 'fullName',  minWidth :330,align: 'center',type:'text',isSort:false},
                { display: '考核责任人', name: 'kaoheMembersName',minWidth :330,align: 'center',type:'text',isSort:false},
                { display: '创建时间', name: 'created',minWidth :330,align: 'center',type:'date' }
            ],
            toolbar: { items: [
                { text: '设定分监区考核责任人', click: setItem, icon: 'add' }

            ]},
            checkbox:true,
            fixedCellHeight :false,
            isSingleCheck:true,
            pageSize: 50,
            pageSizeOptions: [50, 100],
            height: '97%',
            width: '100%',
            url: '/jifenkaohe/zenrenren/jianqufenjianqulist/fenjianqu',
            method:'get',
            dataAction: 'server', //服务器处理
            root: 'items',
            record: 'total',
            usePager: true,       //服务器分页
            alternatingRow: true,
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
function setItem()
{
    var selectedId = getSelectedId();
    if(!selectedId){
        return;
    }
    $.ligerDialog.open({
        height: 400,
        width: 480,
        title: '设定分监区考核责任人',
        url: '/jifenkaohe/peizhi/setfenJianqukaohezerenren',
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
