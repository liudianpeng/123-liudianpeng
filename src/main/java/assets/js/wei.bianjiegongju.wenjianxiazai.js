var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                //{display: '编号', name: 'id', width: 100, align: 'center'},
                {display: '标题', name: 'title', width: 200, align: 'left'},
                {display: '内容', name: 'content', minWidth: 300, width: 400, align: 'left'},
                {
                    display: '下载',
                    name: 'filePath',
                    minWidth: 100,
                    align: 'center',
                    render: function (rowdata, index, value) {
                        return "<a target='_blank' href='" + value + "' style='color: #fa0000;'><b>下载</b></a>"
                    }
                },
                {display: '发送时间', name: 'created', minWidth: 120, type: 'date'}
            ],
            pageSizeOptions: [10, 20, 50, 100],
            height: '97%',
            width: '100%',
            rownumbers: true,
            pageSize: 20,
            record: 'total',
            url: '/api/bianjiegongju/wenjianxiazai/list',
            dataAction: 'server', //服务器处理
            fixedCellHeight: false,
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

function getSelected() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请选择行');
        return;
    }
    alert(JSON.stringify(row));
}
function reload() {
    manager.reload(1);
}