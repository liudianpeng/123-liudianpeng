var manager;

$(function ()
{
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: '编号', name: 'cid', isSort: false, width: 100},
                {display: '姓名', name: 'name', isSort: false, width: 100, type: 'text'},
                {display: '裁定日期', name: 'date', isSort: false, width: 100, type: 'date'},
                {display: '类别', name: 'leibie', isSort: false, width: 100, type: 'text'},
                {display: '幅度', name: 'fudu', isSort: false, width: 100, type: 'text'}
            ],
            enabledEdit: false,
            clickToEdit: false,
            isScroll: false,
            checkbox: false,
            usePager: false,
            width: '50%',
            height: '97%',
            //data:Data,
            url: '/api/jifenkaohe/common/kaoherenyuan/jianqu/6050',
            //dataAction: 'server', //服务器处理
            root: 'items',
            method:'get',
            //data: Data,
            //显示数据前事件
            onBeforeShowData: function () {
            },
            //显示数据后事件
            onAfterShowdata: function () {
            },
            onSelectRow: function (rowdata, rowindex) {
                //$(this).checkbox=true;
                //console.log(rowdata);
                $("#txtrowindex").val(rowindex);
            }

        });
    //$.getJSON("/api/jifenkaohe/common/memberjianqus",function(res) {
    //    var Data = [];
    //    $.each(res, function (value, name) {
    //        var obj = {"id": res[value].id, "text": res[value].name};
    //        Data.push(obj);
    //    });
    //    $("#txtPro").before("<label>监区：</label>");
    //    $("#txtPro").ligerComboBox({
    //        data: Data,
    //        isMultiSelect: false,//是否多选
    //        initIsTriggerEvent: false,
    //        onSelected: function (newvalue) {
    //            var Data =
    //            {
    //                Rows: [
    //                    {   "date":"2016-01-30",
    //                        "id": "7654231001",
    //                        "name": "张松凌",
    //                        "leibie": "假释",
    //                        "fudu": "23"
    //
    //                    },
    //                    {   "date":"2016-01-30",
    //                        "id": "7654231001",
    //                        "name": "宋清林",
    //                        "leibie": "减刑",
    //                        "fudu": "23"
    //
    //                    },
    //                    {   "date":"2016-01-30",
    //                        "id": "7654231001",
    //                        "name": "李英浩",
    //                        "leibie": "减余刑释放",
    //                        "fudu": "23"
    //
    //                    },
    //                    {   "date":"2016-01-30",
    //                        "id": "7654231001",
    //                        "name": "王传冲",
    //                        "leibie": "假释",
    //                        "fudu": "23"
    //
    //                    },
    //                    {   "date":"2016-01-30",
    //                        "id": "7654231001",
    //                        "name": "宋凌",
    //                        "leibie": "假释",
    //                        "fudu": "23"
    //
    //                    }
    //
    //                ], Total: 91
    //            };
    //            //var JianquId = newvalue;
    //            window['g'] =
    //                manager = $("#maingrid").ligerGrid({
    //                    columns: [
    //                        {display: '裁定日期', name: 'date', isSort: false, width: 100, type: 'date'},
    //                        {display: '编号', name: 'id', isSort: false, width: 100},
    //                        {display: '姓名', name: 'name', isSort: false, width: 100, type: 'text'},
    //                        {display: '类别', name: 'leibie', isSort: false, minWidth: 100, type: 'text'},
    //                        {display: '幅度', name: 'fudu', isSort: false, minWidth: 100, type: 'text'}
    //                    ],
    //                    enabledEdit: false,
    //                    clickToEdit: false,
    //                    isScroll: false,
    //                    checkbox: false,
    //                    usePager: false,
    //                    width: '100%',
    //                    height: '97%',
    //                    data:Data,
    //                    //url: '/api/jifenkaohe/common/kaoherenyuan/jianqu/'+JianquId,
    //                    //dataAction: 'server', //服务器处理
    //                    //root: 'items',
    //                    //method:'get',
    //                    //data: Data,
    //                    //显示数据前事件
    //                    onBeforeShowData: function () {
    //                    },
    //                    //显示数据后事件
    //                    onAfterShowdata: function () {
    //                    },
    //                    onSelectRow: function (rowdata, rowindex) {
    //                        //$(this).checkbox=true;
    //                        //console.log(rowdata);
    //                        $("#txtrowindex").val(rowindex);
    //                    }
    //
    //                });
    //            $("#pageloading").hide();
    //            /**
    //             * 刷新数据
    //             */
    //        }
    //    });
    //});
    function reload()
    {
        manager.reload(1);
    }
});










