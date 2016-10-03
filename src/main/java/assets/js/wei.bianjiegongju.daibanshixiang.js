var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    //{ display: '编号', name: 'id', width: 70, align: 'center' },
                    {
                        display: '状态', name: 'icon', width: 100, align: 'center', render: function (rowdata, index, value) {
                        return "<img src='" + value + "' width=32 />"
                    }
                    },
                    {display: '时间', name: 'created', minWidth: 100, align: 'center', type: 'date'},
                    {display: '标题', name: 'title', minWidth: 200, align: 'left'},
                    {display: '内容', name: 'content', minWidth: 300, align: 'left'},
                ],
                toolbar: {
                    items: []
                },
                fixedCellHeight: false,
                checkbox: false,
                isSingleCheck: true,
                rownumbers: true,
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                pageSize: 20,
                record: 'total',
                url: '/api/bianjiegongju/daibanshixiang/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                onSelectRow: function () {
                    var row = manager.getSelectedRow();
                    var rowid = row.id;
                    var url = "/api/bianjiegongju/daibanshixiang/read/" + rowid;
                    $("#pageloading").show();
                    $.getJSON(url, null, function (res) {
                        reload();
                    });
                }
            }
        );
    $("#pageloading").hide();
});

function reload() {
    manager.reload(1);
    $("#pageloading").hide();
}
