var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'id', width: 100, align: 'center'},
                    {display: '名称', name: 'title', width: 200, align: 'left'},
                    {
                        display: '发布状态', name: 'published', width: 60, align: 'left',
                        render: function (row) {
                            if (!!row.published)
                                return "已发布";
                            else
                                return "未发布";
                        }
                    },
                    {display: '内容', name: 'content', minWidth: 400, align: 'left'}


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
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                pageSize: 20,
                record: 'total',
                url: '/api/xitongguanli/notice/list',
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
        height: 300,
        width: 420,
        title: '添加消息',
        url: '/xitongguanli/xiaoxiguanli/add',
        showMax: false,
        showToggle: false,
        showMin: false,
        isResize: false,
        slide: false
    });
}

function deleteItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ajax({
        type: 'DELETE',
        url: '/api/xitongguanli/notice/delete/' + selectedId,
        success: function (res) {
            //res = JSON.parse(res);
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


function editItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 320,
        width: 450,
        title: '编辑消息',
        url: '/xitongguanli/xiaoxiguanli/edit',
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

