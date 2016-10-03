var manager;
$(function () {
    var jianquId = document.getElementById("jianquId").value;
    //console.log(id);
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: '编号', name: 'cid', isSort: false, width: 100},
                {display: '姓名', name: 'name', isSort: false, width: 100, type: 'text'},
                {
                    display: '奖分', name: 'jk', isSort: false, minWidth: 100, type: 'text',
                    totalSummary: {
                        name: '总分',
                        type: 'sum',
                        render: function (e) {
                            return "<div>小计:" + e.sum + "</div>";
                        }
                    }
                },
                {display: '奖扣说明', name: 'jksm', isSort: false, minWidth: 100, type: 'text'},
                {display: '单据号码', name: 'djhm', isSort: false, minWidth: 100, type: 'text'},
                {display: '单据摘要', name: 'djzy', isSort: false, minWidth: 100, type: 'text'}
            ],
            url: '/api/jifenkaohe/yuzhengke/yuzhengjiangkoufen/get/7312/'+jianquId,
            method: 'get',
            enabledEdit: false,
            clickToEdit: false,
            isScroll: false,
            checkbox: false,
            usePager: false,
            width: '100%',
            height: '97%',
            root: 'items',
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
    //            var JianquId = newvalue;
    //
    //            $("#pageloading").hide();
    //            /**
    //             * 刷新数据
    //             */
    //
    //            function reload() {
    //                manager.reload(1);
    //            }
    //        }
    //    });
    //});
});
function reload() {
    manager.reload(1);
}









