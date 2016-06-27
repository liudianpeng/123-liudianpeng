var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: '编号', name: 'id', width: 70, align: 'center'},
                {display: '考核流程', name: 'flowName',width: 100, align: 'center'},
                {display: '考核名称', name: 'name', minWidth: 290, align: 'center'},
                {display: '备注', name: 'remark', minWidth: 70,width:158, align: 'center'},
                {display: '考核周期', name: 'cycle', minWidth: 70,width:70, align: 'center'},
                {display: '当前状态', name: 'state', minWidth: 80, align: 'center'},
                {display: '是否结转', name: 'show', minWidth: 60,width:60, align: 'center', render: jieZhuang},
                {display: '创建时间', name: 'created', minWidth: 90,width:90, align: 'center',type: 'date'}
            ],
            pageSizeOptions: [10, 20, 50, 100],
            height: '97%',
            width: '100%',
            pageSize: 20,
            record: 'total',
            url: '/api/jifenkaohe/system/checkingcircle/list',
            dataAction: 'server', //服务器处理
            fixedCellHeight: false,
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            selectRowButtonOnly:false,
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
        alert('请选择周期');
        return;
    }
    return row.id;
}

function reload() {
    manager.reload(1);
}

function jieZhuang(rowdata, rowid) {
    return "<a style='color:#fa0000;' href='javascript:jz();'><b>结转</b></a>"
}

function jz() {
    var selectedId = manager.getSelectedRow().id;
    //console.log(selectedId);

    //var selectedId = manager.selected[0].id;
    //console.log(selectedId);

    $.ligerDialog.confirm('是否确定结转?', function (e) {
        if (e) {
            $.ajax({
                type: 'GET',
                url: '/api/jifenkaohe/yuzhengke/jiezhuan/' + selectedId,
                async: false,
                success: function (res) {
                    if (res == "审核未结束，当前不能结转") {
                        $.ligerDialog.alert('审核未结束，当前不能结转!', '提示');
                    } else {
                        $.ligerDialog.alert('结转成功!', '提示');
                    }
                }
            })
        } else {
            $.ligerDialog.alert('取消结转！', '提示');
        }
    });

}