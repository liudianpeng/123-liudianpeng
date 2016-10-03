var manager;

$(function () {
    $.ligerDefaults.Grid.formatters['enabled'] = function (value, column) {
        if (value.toString() == 'true') {
            return '<font color=blue ><b>启用</b></font>';
        } else {
            return '<font color=red ><b>禁用</b></font>';
        }
    };
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'id', width: 50, align: 'center', isSort: true},
                    {display: '部门名称', name: 'name', align: 'center'},
                    {display: '用户组', name: 'groups', width: 200, align: 'center', isSort: false, render: groups},
                    {display: '创建时间', name: 'created', align: 'center', type: 'date'},
                    {display: '状态', name: 'enabled', type: 'enabled', align: 'center', isSort: false}
                ],
                checkbox: true,
                isSingleCheck: true,
                rownumbers: true,
                fixedCellHeight: false,
                pageSizeOptions: [10, 20, 50, 100],
                pageSize: 20,
                height: '97%',
                width: '99.9%',
                record: 'total',
                url: '/api/xitongguanli/bumenguanli/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                toolbar: {
                    items: [
                        {text: '增加', click: itemAddClick, icon: 'add'},
                        {line: true},
                        {text: '编辑', click: editItem, icon: 'modify'},
                        {line: true},
                        {text: '启用', click: enable, icon: 'delete'},
                        {line: true},
                        {text: '禁用', click: disable, icon: 'delete'},
                        {text: '分配用户组', click: setYonghuzuDataAuthority, icon: 'modify'}
                    ]
                },
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );
});
//获取用户组集合
function groups(rowdata) {
    if (rowdata.groups == null) {
        return '';
    } else {
        var value = '';
        for (var i = 0; i < rowdata.groups.length; i++) {
            value += rowdata.groups[i].name + '&nbsp;'
        }
        return value;
    }
}
function itemclick(item) {
    alert(item.text);
}

function itemAddClick(item) {
    var m = $.ligerDialog.open({
        url: '/xitongguanli/bumenguanli/newDepartment',
        title: '添加部门',
        height: 200,
        width: 400,
        isResize: true
        //buttons: [  ]
    });

}

function enable() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/xitongguanli/bumenguanli/enabled/' + selectedId,

        success: function (res) {
//            res = JSON.parse(res);
            if (res.notice == 'success') {
                $(".notice_sucess").addClass("alert-success alert");
                $(".alert").css("margin", "0");
                $(".notice_sucess").html("启用成功！");
                reload();

            } else {
                $('.notice').html(res.message);
            }
        }
    });
}
function disable() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/xitongguanli/bumenguanli/disabled/' + selectedId,

        success: function (res) {
//            res = JSON.parse(res);
            if (res.notice == 'success') {
                $(".notice_sucess").addClass("alert-success alert");
                $(".alert").css("margin", "0");
                $(".notice_sucess").html("禁用成功！");
                reload();

            } else {
                $('.notice').html(res.message);
            }
        }
    });


}

function getSelectedId() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请先选择一行');
        return;
    }
    return row.id;
}

function editItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        width: 400,
        height: 200,
        title: '编辑部门',
        url: '/xitongguanli/bumenguanli/editDepartment/' + selectedId,
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


function setYonghuzuDataAuthority() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 400,
        width: 500,
        title: '分配用户组',
        url: '/xitongguanli/bumenguanli/setYonghuzuDataAuthority',
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


function reload() {
    manager.reload(1);
}