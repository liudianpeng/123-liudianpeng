var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'id', width: 100, align: 'center'},
                    {display: '名称', name: 'name', width: 200, align: 'center'},
                    {
                        display: '角色',
                        name: 'roles',
                        minWidth: 200,
                        width: 250,
                        align: 'center',
                        isSort: false,
                        render: roles
                    },
                    {display: '创建时间', name: 'created', minWidth: 100, align: 'center', type: 'date'}

                ],
                toolbar: {
                    items: [
                        {text: '增加', click: addItem, icon: 'add'},
                        {line: true},
                        {text: '编辑', click: editItem, icon: 'modify'},
                        {text: '设定角色', click: setRole, icon: 'modify'}
                        //{ text: '分配监区', click: setJianquDataAuthority, icon: 'modify' }
                        // ,
                        // { text: '分配分监区', click: setFenjianquDataAuthority, icon: 'modify' }
                    ]
                },
                fixedCellHeight: false,
                checkbox: true,
                isSingleCheck: true,
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '99.9%',
                pageSize: 20,
                record: 'total',
                url: '/api/xitongguanli/group/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                rownumbers:true,
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );
    $("#pageloading").hide();
});
//获取用户组集合
function roles(rowdata) {
    if (rowdata.roles == null) {
        return '';
    } else {
        var value = '';
        for (var i = 0; i < rowdata.roles.length; i++) {
            value += rowdata.roles[i].name + '&nbsp;'
        }
        return value;
    }
}

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
function setRole() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 400,
        width: 480,
        title: '设定角色',
        url: '/xitongguanli/yonghuzuguanli/setrole',
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
function setJianquDataAuthority() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 100,
        width: 480,
        title: '分配监区',
        url: '/xitongguanli/yonghuzuguanli/setJianquDataAuthority',
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
function setFenjianquDataAuthority() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 100,
        width: 480,
        title: '分配分监区',
        url: '/xitongguanli/yonghuzuguanli/setFenjianquDataAuthority',
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


function addItem() {
    $.ligerDialog.open({
        height: 200,
        width: 400,
        title: '添加用户组',
        url: '/xitongguanli/yonghuzuguanli/add',
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
        title: '编辑用户组',
        url: '/xitongguanli/yonghuzuguanli/edit',
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
