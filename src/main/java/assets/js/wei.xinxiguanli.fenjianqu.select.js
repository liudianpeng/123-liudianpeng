var dialogData = window.parent.manager2.selectedValue;
var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                //{display: '编号', name: 'id', width: 100, minWidth: 100, align: 'center',type:'int',isSort:true },
                {display: '监区', name: 'name', width: 150, minWidth: 100, align: 'center',type:'text',isSort:true},
                {display: '编码', name: 'code', minWidth: 50, align: 'center',type:'int',isSort:true}
                //{display: '创建时间', name: 'created', minWidth: 138, align: 'center', type: 'rizhi_date',isSort:true}
            ],
            height: '99%',
            frozen:true,
            width: '100%',
            url: '/api/xinxiguanli/renyuanliebiao/getfenjianqulist/' + dialogData,
            root: 'items',
            enabledSort:true,
            alternatingRow: true,
            method: 'get',
            usePager: false,
            dataAction:'server',
            switchPageSizeApplyComboBox: true,
            onBeforeShowData: function () {
            },
            onAfterShowdata: function () {
            },
            onDblClickRow: function (data, rowindex, rowobj) {
                //确定选择监区
                var name = data.name;
                var id = data.id;
                //console.log(name);
                window.parent.manager3.selectedText = name;
                window.parent.manager3.element.value = name;
                window.parent.manager3.selectedValue = id;
                window.parent.f_selectContactCancel();
                window.parent.jianqu();
            }
        });
});
    function f_select() {
        return g.getSelectedRow();
    }
    function reload() {
        manager.reload(1);
    }