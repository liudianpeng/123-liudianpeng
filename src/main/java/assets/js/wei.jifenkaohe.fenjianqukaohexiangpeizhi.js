var manager;
$(function () {

    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'id', minWidth: 50, width: 50, align: 'center'},
                    {display: '名称', name: 'name', minWidth: 100, width: 100, align: 'center'},
                    {display: '最大值', name: 'max_value', minWidth: 100, align: 'center'},
                    {display: '最小值', name: 'min_value', minWidth: 100,  align: 'center'},
                    {display: '默认值', name: 'default_value', minWidth: 100, align: 'center'},
                    {display: '拼音', name: 'pinyin', minWidth: 100, align: 'center'},
                    {display: '状态', name: 'archive', minWidth: 100, type: 'enabled', align: 'center', isSort: false}
                ],
                toolbar: {
                    items: [
                        {text: '增加', click: addItem, icon: 'add'},
                        {line: true},
                        {text: '编辑', click: editItem, icon: 'modify'},
                        {line: true},
                        {text: '启用', click: enable, icon: 'delete'},
                        {line: true},
                        {text: '禁用', click: disable, icon: 'delete'}
                    ]
                },
                isScroll: true,
                checkbox: true,
                isSingleCheck: true,
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                pageSize: 20,
                record: 'total',
                url: '/api/jifenkaohe/fenjianqukaohexiangpeizhi/list',
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


function enable() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/jifenkaohe/fenjianqukaohexiangpeizhi/enabled/' + selectedId,

        success: function (res) {
//            res = JSON.parse(res);
            if (res.notice == 'success') {
                reload();

            } else {
                $('.notice').html(res.message);
            }
        }
    });
}
function disable() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ajax({
        type: 'GET',
        url: '/api/jifenkaohe/fenjianqukaohexiangpeizhi/disabled/' + selectedId,

        success: function (res) {
//            res = JSON.parse(res);
            if (res.notice == 'success') {
                reload();

            } else {
                $('.notice').html(res.message);
            }
        }
    });
}


function addItem() {
    $.ligerDialog.open({
        height: 380,
        width: 430,
        title: '添加分监区考核项',
        url: '/jifenkaohe/peizhi/fenjianqukaohexiangpeizhi/add',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false
    });
}

function editItem() {
    var selectedId = getSelectedId();
    if (!selectedId) {
        return;
    }
    $.ligerDialog.open({
        height: 380,
        width: 430,
        title: '编辑分监区考核项',
        url: '/jifenkaohe/peizhi/fenjianqukaohexiangpeizhi/edit',
        showMax: true,
        showToggle: true,
        showMin: false,
        isResize: true,
        slide: false,
        data: {
            id: selectedId
        }
    })
}

