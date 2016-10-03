var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    //{display: '编号', name: 'id', width: 100, align: 'center'},
                    {display: '标题', name: 'title', minWidth: 200, align: 'left'},
                    {display: '发布时间', name: 'created', width: 100, align: 'center', type: 'date'},
                    {display: '内容', name: 'content', minWidth: 350, align: 'left'}
                ],
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [10, 20, 50, 100],
                width: '100%',
                height: '97%',
                pageSize: 20,
                fixedCellHeight: false,
                rownumbers: true,
                record: 'total',
                url: '/api/bianjiegongju/zuixinxiaoxi/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
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
