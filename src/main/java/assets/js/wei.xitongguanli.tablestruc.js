var manager;
$(function ()
    {
            window['g'] =
            manager = $("#maingrid").ligerGrid({
                height: '99%',
                columns: [
                { display: '编号', name: 'id', width: 100, align: 'center' },
                { display: '表名称', name: 'table_name', width: 100, align: 'left' },
                { display: '表主键', name: 'fields_key_name', width: 200, align: 'left' },
                { display: '字段名称', name: 'fields_name', width: 200,  align: 'left' },
                { display: '字段类型', name: 'fields_type', width: 80,  align: 'left' },
                { display: '字段长度', name: 'fields_length', width: 80,  align: 'left' },
                { display: '允许空', name: 'fields_not_null', width: 80,  align: 'left' },
                { display: '默认值', name: 'fields_default', width: 80,  align: 'left' },
                { display: '字段说明', name: 'fields_comment', width: 200,  align: 'left' }
                ],
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                pageSize: 20,
                rownumbers: true,
                record: 'total',
                url: '/api/xitongguanli/tablestruct/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function ()
                {
                },
                onAfterShowdata: function ()
                {
                }
            });
            $("#pageloading").hide();
        });

        function getSelected()
        {
            var row = manager.getSelectedRow();
            if (!row) { alert('请选择行'); return; }
            alert(JSON.stringify(row));
        }
        function reload()
        {
            manager.reload(1);
        }