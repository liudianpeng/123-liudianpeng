var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({

            columns: [
                {display: '编号', name: 'id', width: 100, minWidth: 100, align: 'center', type: 'int'},
                {display: '字典分类', name: 'namespace', width: 120, minWidth: 100, align: 'center', type: 'text'},
                {display: '名称', name: 'name', minWidth: 200, align: 'center', type: 'text'},
                {display: '数值', name: 'value', minWidth: 200, align: 'center', type: 'text'},
                {display: '对照编码', name: 'code', minWidth: 80, align: 'center', type: 'text'},
                {display: '显示名称', name: 'display', minWidth: 80, align: 'center', type: 'text'}
            ],
            toolbar: {
                items: [
                    {text: '增加', click: addItem, icon: 'add'},
                    {line: true},
                    {text: '编辑', click: editItem, icon: 'modify'},
                    {line: true},
                    {text: '删除', click: deleteItem, icon: 'delete'}
                ]
            },
            checkbox: true,
            isSingleCheck: true,
            width: '100%',
            height: '97%',
            rownumbers: true,
            pageSize: 20,
            pageSizeOptions: [10, 20, 50, 100],
            record: 'total',
            url: '/api/xitongguanli/dict/list',
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
        height: 350,
        width: 400,
        title: '增加字典',
        url: '/xitongguanli/tongyongzidianguanli/add',
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
        height: 350,
        width: 400,
        title: '编辑字典',
        url: '/xitongguanli/tongyongzidianguanli/edit',
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

function deleteItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: '/api/xitongguanli/dict/delete/' + selectedId,
        success: function (res) {
//            res = JSON.parse(res);
            if (res.notice == 'success') {
                $(".notice_sucess").addClass("alert-success alert");
                $(".alert").css("margin", "0");
                $(".notice_sucess").html("删除成功！");
                reload();
            } else {
                $('.notice').html(res.message);
            }
        }
    });
}

