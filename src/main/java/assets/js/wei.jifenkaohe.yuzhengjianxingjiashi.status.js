var manager;
$(function () {
    var id = document.getElementById("postId").value;
    //console.log(id);
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '监区', name: 'jianqu', width: 300, align: 'center', isSort: true},
                    {display: '状态', name: 'state', align: 'center'}
                    //{display: '查看', name: 'show', width: 200, align: 'center', render: showData}
                ],
                toolbar: {
                    items: [
                        {text: '录入/查看', click: setItem, icon: 'show'}
                        //{line: true},
                        //{text: '查看', click: showItem, icon: 'add'}
                    ]
                },
                checkbox: false,
                fixedCellHeight: false,
                //pageSizeOptions: [10, 20, 50, 100],
                //pageSize: 20,
                url: '/api/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/' + id,
                height: '97%',
                width: '100%',
                record: 'total',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                //pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                },
                rowAttrRender: function (rowdata, rowid) {
                    if (rowdata.state == "录入中") {
                        return "style='color:gray;font-weight:bold'";
                    } else if (rowdata.state == "审核通过") {
                        return "style='color:green;font-weight:bold'";
                    } else if (rowdata.state == "等待审核") {
                        return "style='color:blue;font-weight:bold'";
                    } else if (rowdata.state == "审核未通过") {
                        return "style='color:red;font-weight:bold'";
                    }
                }
            }
        );
});
function reload() {
    manager.reload(1);
}
function getSelectedId() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请先选择一行');
        return;
    }
    return row.jianquid;
}
function setItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 500,
        width:1000,
        title: '展示数据',
        url: '/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/jifenluru/' + selectedId,
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
function showData(rowdata, rowid) {
    if (rowdata.state == "录入中") {
        return "<a href='/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/jifenluru'><b style='color: red'>录入</b></a>"
    } else {
        return "<a href='/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/jifenluru/show'><b>查看</b></a>"
    }
}
