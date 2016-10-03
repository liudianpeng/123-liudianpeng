var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'id', width: 100, align: 'center'},
                    {display: '名称', name: 'name', width: 200, minWidth: 100, align: 'center'},
                    {display: '创建时间', name: 'created', minWidth: 200, align: 'center', type: 'date'}

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
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '99.9%',
                pageSize: 20,
                record: 'total',
                url: '/api/xitongguanli/role/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                rownumbers: true,
                method: 'get',
                pagesizeParmName: 'limit',
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );
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
        height: 200,
        width: 400,
        title: '添加角色',
        url: '/xitongguanli/jueseguanli/add',
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
        height: 200,
        width: 400,
        title: '编辑角色',
        url: '/xitongguanli/jueseguanli/edit',
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
