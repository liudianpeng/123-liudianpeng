var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({

            columns: [
                {display: '编号', name: 'id', width: 100, minWidth: 120, align: 'center'},
                {display: '资料类型', name: 'name', minWidth: 100, align: 'center'},
                {display: '创建时间', name: 'created', minWidth: 200, type: 'rizhi_date', align: 'center'},
                {display: '状态', name: 'stateName', minWidth: 200, align: 'center'}
            ],
            toolbar: {
                items: [
                    {text: '增加', click: addItem, icon: 'add'},
                    {line: true},
                    {text: '编辑', click: editItem, icon: 'modify'}
                ]
            },
            checkbox: true,
            isSingleCheck: true,
            pageSizeOptions: [20, 50, 100],
            width: '100%',
            height: '97%',
            pageSize: 20,
            record: 'total',
            rownumbers: true,
            url: '/api/xitongguanli/dict/rujianziliaofenlei/list',
            dataAction: 'server', //服务器处理
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            onBeforeShowData: function () {
            },
            onAfterShowdata: function () {
            }
        });
    $("#pageloading").hide();
});

function getSelectedId() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请先选择一行');
        return;
    }
    return row.id;
}
function reload() {
    manager.reload(1);
}

function addItem() {
    $.ligerDialog.open({
        height: 280,
        width: 400,
        title: '添加入监资料类别',
        url: '/xitongguanli/rujianziliaoleibie/add',
        showMax: false,
        showToggle: false,
        showMin: false,
        isResize: false,
        slide: false
    });
}

function editItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 280,
        width: 400,
        title: '编辑入监资料类别',
        url: '/xitongguanli/rujianziliaoleibie/edit',
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
function archiveItem() {

}
