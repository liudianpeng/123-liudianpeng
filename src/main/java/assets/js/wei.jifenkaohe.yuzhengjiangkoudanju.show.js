var manager;

$(function ()
{
    $.getJSON("/api/jifenkaohe/common/memberjianqus",function(res) {
        var Data = [];
        $.each(res, function (value, name) {
            var obj = {"id": res[value].id, "text": res[value].name};
            Data.push(obj);
        });
        $("#txtPro").before("<label>监区：</label>");
        $("#txtPro").ligerComboBox({
            data: Data,
            isMultiSelect: false,//是否多选
            initIsTriggerEvent: false,
            onSelected: function (newvalue) {
                var JianquId = newvalue;
                var Data =
                {
                    Rows: [
                        {
                            "id": "3231212020",
                            "djid": "76542310012",
                            "notice": "奖分通知单"
                        },
                        {
                            "id": "3231212022",
                            "djid": "76542310013",
                            "notice": "奖分通知单"
                        },
                        {
                            "id": "3231212032",
                            "djid": "76542310014",
                            "notice": "奖分通知单"
                        },
                        {
                            "id": "3231212012",
                            "djid": "76542310015",
                            "notice": "奖分通知单"
                        }, {
                            "id": "3231212002",
                            "djid": "76542310016",
                            "notice": "奖分通知单"
                        }, {
                            "id": "3231212054",
                            "djid": "76542310017",
                            "notice": "奖分通知单"
                        }, {
                            "id": "3231212065",
                            "djid": "76542310018",
                            "notice": "扣分通知单"
                        }
                    ], Total: 91
                };
                window['g'] =
                    manager = $("#maingrid").ligerGrid({
                        columns: [
                            {display: '档案编号', name: 'id', isSort: false, width: 100, type: 'int'},
                            {display: '单据编号', name: 'djid', isSort: false, minWidth: 100, type: 'int'},
                            {display: '通知单', name: 'notice', isSort: false, minWidth: 100, type: 'text'},
                        ],
                        enabledEdit: false,
                        clickToEdit: false,
                        isScroll: false,
                        checkbox: false,
                        usePager: false,
                        width: '100%',
                        height: '97%',
                        data: Data,
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
                $("#pageloading").hide();
                /**
                 * 刷新数据
                 */

                function reload() {
                    manager.reload(1);
                }
            }
        });
    });
});










