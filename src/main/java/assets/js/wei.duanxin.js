var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                //{display: '编号', name: 'id', width: 100, align: 'center'},
                {display: '发送人', name: 'sender.nickname', width: 100, align: 'left'},
                {display: '接收人', name: 'receiver.nickname', width: 100, align: 'left'},
                {display: '短信内容', name: 'content', width: 400, align: 'left'},
                {display: '发送时间', name: 'created', width: 120, type: 'date'}
            ],
            pageSizeOptions: [10, 20, 50, 100],
            height: '97%',
            width: '100%',
            pageSize: 20,
            rownumbers: true,
            record: 'total',
            url: '/api/bianjiegongju/duanxi/list',
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