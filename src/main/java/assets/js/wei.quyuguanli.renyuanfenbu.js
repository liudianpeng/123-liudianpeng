var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: 'id', name: 'jid', width: 50, align: 'center', frozen: true, isSort: true},
                {display: '单位', name: 'jianqu', width: 100, align: 'center', frozen: true},
                {display: '总人数', name: 'total', width: 50, align: 'center', frozen: true},
                {
                    display: '生活区', columns: [
                    {display: '小计', name: 'shxiaoji', minWidth: 50, width: 50},
                    {display: '劳动岗', name: 'shlaodonggang', minWidth: 50, width: 50},
                    {display: '监舍', name: 'shjianshe', minWidth: 50, width: 50},
                    {display: '住院西', name: 'shzhuyuanxi', minWidth: 50, width: 50},
                    {display: '住院东', name: 'shzhuyuandong', minWidth: 50, width: 50},
                    {display: '集训', name: 'shjixun', minWidth: 50, width: 50},
                    {display: '其他', name: 'shqita', minWidth: 50, width: 50}
                ]
                },
                {
                    display: '生产区', columns: [
                    {display: '小计', name: 'scxiaoji', minWidth: 50, width: 50},
                    {display: '劳动岗', name: 'sclaodonggang', minWidth: 50, width: 50},
                    {display: '严管', name: 'scyanguan', minWidth: 50, width: 50},
                    {display: '禁闭', name: 'scjinbi', minWidth: 50, width: 50},
                    {display: '隔离控制', name: 'scgelikongzhi', minWidth: 50, width: 60},
                    {display: '单独关押', name: 'scdanduguanya', minWidth: 50, width: 60},
                    {display: '其他', name: 'scqita', minWidth: 50, width: 50}
                ]
                },
                {
                    display: '其他', columns: [
                    {display: '小计', name: 'qtxiaoji', minWidth: 50, width: 50},
                    {display: '外提', name: 'qtwaiti', minWidth: 50, width: 50},
                    {display: '外医', name: 'qtwaiyi', minWidth: 50, width: 50},
                    {display: '保外', name: 'qtbaowai', minWidth: 50, width: 50},
                    {display: '其他', name: 'qtqita', minWidth: 50, width: 50}
                ]
                },
                {display: '报告人', name: 'baogaoren', width: 50, align: 'center'},
                {display: '报告时间', name: 'baogaoshijian', width: 100, align: 'center', type: 'date'},
                {display: '值班干警', name: 'zhibanganjing', width: 250, align: 'center'}
            ],
            fixedCellHeight: false,
            switchPageSizeApplyComboBox: true,
            pageSizeOptions: [10, 20, 50, 100],
            width: '100%',
            height: '97%',
            pageSize: 20,
            record: 'total',
            //url: '/api/quyuguanli/renyuanfenbu/list',
            data: 'server',
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            onBeforeShowData: function () {
            },
            onAfterShowdata: function () {
            }
        });
    $("#pageloading").hide();
});


