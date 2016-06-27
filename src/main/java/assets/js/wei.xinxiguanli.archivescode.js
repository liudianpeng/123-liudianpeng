var manager;
var manager1;
var manager3;
var tree;
$(function () {
    var id = window.parent.wei.selectedCriminal;
    $("#txtPro").before("<label>档案类型：</label>");
    manager = $("#txtPro").ligerComboBox({
        data: [
            {text: '请选择', id: 'ALL'},
            {text: '减刑假释', id: 'JXJS'},
            {text: '暂予监外执行', id: 'ZYJWZX'}
        ],
        value: 'ALL',
        width: 170,
        isMultiSelect: false,//是否多选
        initIsTriggerEvent: false,
        onSelected: function (value, text) {
            //console.log(value);
            $.getJSON("/api/xinxi/dianzidanganmulu/archivesList/" + value, function (res) {
                //console.log(res)
                if (res.length == 0) {
                    manager1 = $("#tree1").html('<p style="text-align:center;padding:5px;">无档案类型</p>')
                } else {
                    manager1 = $("#tree1").ligerTree({
                            nodeWidth: 120,
                            data: res,
                            idFieldName: 'codeid',
                            parentIDFieldName: 'ucodeid',
                            textFieldName: 'name',
                            isExpand: false,
                            onCheck: onCheck
                        }
                    );
                }
            });
        }
    });
    //初始化值
    var initvalue = manager.selectedValue;
    //console.log(initvalue);
    //初始化tree
    $.getJSON("/api/xinxi/dianzidanganmulu/archivesList/" + initvalue, function (res) {
        //console.log(res)
        if (res.length == 0) {
            manager1 = $("#tree1").html('<p style="text-align:center;padding:5px;">无档案类型</p>')
        } else {
            manager1 = $("#tree1").ligerTree({
                    nodeWidth: 120,
                    data: res,
                    idFieldName: 'codeid',
                    parentIDFieldName: 'ucodeid',
                    textFieldName: 'name',
                    isExpand: false,
                    onCheck: onCheck
                }
            );
        }
    });

});

function onCheck(node) {
    var dananid = node.data.id;
    //alert(dananid);
    var notes = manager1.getChecked();
    //console.log(notes)
    var valueStr = [];
    for (var i = 0; i < notes.length; i++) {
        var chuanid = notes[i].data.id;
        //text += notes[i].data.id + ",";
        valueStr.push(chuanid)
    }

    $.ajax({
        type: 'POST',
        url: '/api/xinxi/dianzidanganmulu/archivesList/' + id,
        data: {"dt": valueStr},
        success: function (res) {
            window['g'] =
                manager3 = $("#maingrid").ligerGrid({
                    columns: [
                        {
                            name: 'id', display: '序号', width: 50,
                            render: function (record, rowindex) {
                                //console.log(record)
                                var rowIndex = rowindex + 1;
                                //console.log(rowIndex)
                                return "<span>" + rowIndex + "</span>";
                            }
                        },
                        {display: '罪犯名称', name: 'xm', width: 100, align: 'left', isSort: false},
                        {display: '材料名称', name: 'name', minWidth: 180, align: 'left'},
                        {display: '归档时间', name: 'created', width: 180, align: 'left', type: 'date'},
                        {
                            display: '操作', name: 'show', width: 180, align: 'center', isSort: false,
                            render: function (rowdata) {
                                //console.log(rowdata)
                                //var id = rowdata.id;
                                var selectpath = rowdata.filepath;
                                //console.log(selectpath);
                                //return "<a href='/api/xinxi/dianzidanganmulu' target='_blank'><b>查看</b></a>";
                                return "<a href='/assets/vendor/FlexPaper/index.html' target='_blank'><b>查看</b></a>"
                            }
                        }
                    ],
                    toolbar: {
                        items: [
                            {text: '合并查看', click: Mergeshow}
                        ]
                    },
                    checkbox: true,
                    //frozenRownumbers:true,
                    rownumbersColWidth: 50,
                    height: '98%',
                    width: '100%',
                    pageSize: 20,
                    //rownumbers: true,
                    pageSizeOptions: [20, 50, 100],
                    record: 'total',
                    data: res,
                    dataAction: 'server', //服务器处理
                    root: 'items',
                    usePager: true,       //服务器分页
                    alternatingRow: true,
                    method: 'post',
                    pagesizeParmName: 'limit',
                    switchPageSizeApplyComboBox: true
                });
            manager3.options.newPage = 1;
        }
    });
    //console.log(valueStr);
    //alert('选择的节点数：' + text1);
}
//合并查看
function Mergeshow() {
    var  newStr=manager3.selected;
    var len=manager3.selected.length;
    //console.log(newStr)
    var valueStr=[];
    for (var i=0;i<len;i++){
        valueStr.push(newStr[i].id)
    }
   // 合并查看valueStr:[id,id,id,.....]
   //console.log( valueStr);
    //window.location.href='/assets/vendor/FlexPaper/index.html'
    window.open('/assets/vendor/FlexPaper/index.html');
}

