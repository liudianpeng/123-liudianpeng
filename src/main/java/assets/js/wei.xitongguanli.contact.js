var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({

            columns: [
                {display: 'ID', name: 'id', width: 100, minWidth: 100, align: 'center', type: 'int'},
                {display: '名称', name: 'name', width: 120, minWidth: 100, align: 'center', type: 'text'},
                {display: '手机', name: 'mobile', minWidth: 200, align: 'center', type: 'text'},
                {display: '电话', name: 'phone', minWidth: 200, align: 'center', type: 'text'},
                {display: '备注', name: 'remark', minWidth: 80, align: 'center', type: 'text'}
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
            rownumbers: true,
            isSingleCheck: true,
            width: '100%',
            height: '97%',
            pageSize: 20,
            pageSizeOptions: [100, 200, 500],
            record: 'total',
            url: '/api/xitongguanli/contact/list',
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
        height: 300,
        width: 400,
        title: '增加通讯录',
        url: '/xitongguanli/tongxinluguanli/add',
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
        height: 300,
        width: 400,
        title: '编辑通讯录',
        url: '/xitongguanli/tongxinluguanli/edit',
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
//////////////////////////////////////////////////////////////////////////////////////
function deleteItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: '/api/xitongguanli/contact/delete/' + selectedId,
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

