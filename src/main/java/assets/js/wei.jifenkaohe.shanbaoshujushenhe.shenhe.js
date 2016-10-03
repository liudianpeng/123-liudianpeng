var manager;
$(function ()
{
    $.getJSON("/api/jifenkaohe/common/memberjianqus",function(res) {
        var proData = [];
        $.each(res, function (value, name) {
            var obj = {"id": res[value].id, "text": res[value].name};
            proData.push(obj);
        });
        $("#txtPro").before("<label>监区：</label>")
        $("#txtPro").ligerComboBox({
            data: proData,
            isMultiSelect: false,//是否多选
            initIsTriggerEvent: false,
            //onBeforeSelect: function (newvalue)
            //{
            //    alert('要选择的是' + newvalue);
            //    return confirm('onBeforeSelect事件可以阻止选择，是否继续');
            //},
            onSelected: function (newvalue) {
                //alert('选择的是' + newvalue);
            }
        });
    });
    var Data =
    {
        Rows: [
            {
                "id": "7658231001",
                "name": "张松凌",
                "jqkhkhdf": "12",
                "jqkhzxjf": "23",
                "jykhzxjf": "4",
                "jykhjykf": "11",
                "fxdyjf": "13",
                "fxdykf": "16",
                "fjqsdf": "2",
                "jqjf": "5",
                "jqkf": "7",
                "fjfs": "8",
                "jqsdf": "4",
                "bysdf": "12",
                "syljjf": "55",
                "byjcbdfs": "33",
                "byjcbdjgs": "55",
                "byjcbdbys": "17",
                "byjcbdkf": "31",
                "tzf": "32",
                "ljjyjyfs": "41",
                "ljjyjyjg": "12",
                "ljjyjyby": "15",
                "jcjl": "17",
                "jjfzsj": "19",
                "jjfzjyj": "22",
                "jjfzjqj": "8"
            },
            {
                "id": "7658231021",
                "name": "宋清林",
                "jqkhkhdf": "34",
                "jqkhzxjf": "65",
                "jykhzxjf": "12",
                "jykhjykf": "65",
                "fxdyjf": "11",
                "fxdykf": "13",
                "fjqsdf": "12",
                "jqjf": "15",
                "jqkf": "8",
                "fjfs": "9",
                "jqsdf": "21",
                "bysdf": "12",
                "syljjf": "56",
                "byjcbdfs": "13",
                "byjcbdjgs": "25",
                "byjcbdbys": "37",
                "byjcbdkf": "11",
                "tzf": "12",
                "ljjyjyfs": "11",
                "ljjyjyjg": "32",
                "ljjyjyby": "45",
                "jcjl": "37",
                "jjfzsj": "29",
                "jjfzjyj": "12",
                "jjfzjqj": "18"

            },
            {
                "id": "7658231081",
                "name": "李英浩",
                "jqkhkhdf": "14",
                "jqkhzxjf": "33",
                "jykhzxjf": "12",
                "jykhjykf": "43",
                "fxdyjf": "32",
                "fxdykf": "23",
                "fjqsdf": "21",
                "jqjf": "7",
                "jqkf": "9",
                "fjfs": "10",
                "jqsdf": "12",
                "bysdf": "38",
                "syljjf": "45",
                "byjcbdfs": "13",
                "byjcbdjgs": "45",
                "byjcbdbys": "10",
                "byjcbdkf": "11",
                "tzf": "12",
                "ljjyjyfs": "33",
                "ljjyjyjg": "22",
                "ljjyjyby": "11",
                "jcjl": "13",
                "jjfzsj": "16",
                "jjfzjyj": "12",
                "jjfzjqj": "10"

            },
            {
                "id": "7658231091",
                "name": "王传冲",
                "jqkhkhdf": "42",
                "jqkhzxjf": "13",
                "jykhzxjf": "15",
                "jykhjykf": "41",
                "fxdyjf": "23",
                "fxdykf": "56",
                "fjqsdf": "12",
                "jqjf": "15",
                "jqkf": "17",
                "fjfs": "9",
                "jqsdf": "18",
                "bysdf": "10",
                "syljjf": "25",
                "byjcbdfs": "13",
                "byjcbdjgs": "25",
                "byjcbdbys": "47",
                "byjcbdkf": "11",
                "tzf": "12",
                "ljjyjyfs": "10",
                "ljjyjyjg": "16",
                "ljjyjyby": "13",
                "jcjl": "15",
                "jjfzsj": "12",
                "jjfzjyj": "12",
                "jjfzjqj": "8"

            },
            {
                "id": "7658231023",
                "name": "宋凌",
                "jqkhkhdf": "16",
                "jqkhzxjf": "21",
                "jykhzxjf": "15",
                "jykhjykf": "31",
                "fxdyjf": "21",
                "fxdykf": "27",
                "fjqsdf": "21",
                "jqjf": "51",
                "jqkf": "17",
                "fjfs": "18",
                "jqsdf": "9",
                "bysdf": "11",
                "syljjf": "25",
                "byjcbdfs": "13",
                "byjcbdjgs": "25",
                "byjcbdbys": "27",
                "byjcbdkf": "21",
                "tzf": "22",
                "ljjyjyfs": "21",
                "ljjyjyjg": "42",
                "ljjyjyby": "25",
                "jcjl": "13",
                "jjfzsj": "11",
                "jjfzjyj": "12",
                "jjfzjqj": "10"
            },
            {
                "id": "7658231021",
                "name": "李峰",
                "jqkhkhdf": "32",
                "jqkhzxjf": "23",
                "jykhzxjf": "17",
                "jykhjykf": "12",
                "fxdyjf": "11",
                "fxdykf": "12",
                "fjqsdf": "42",
                "jqjf": "35",
                "jqkf": "27",
                "fjfs": "28",
                "jqsdf": "38",
                "bysdf": "22",
                "syljjf": "15",
                "byjcbdfs": "13",
                "byjcbdjgs": "35",
                "byjcbdbys": "47",
                "byjcbdkf": "21",
                "tzf": "12",
                "ljjyjyfs": "41",
                "ljjyjyjg": "12",
                "ljjyjyby": "25",
                "jcjl": "37",
                "jjfzsj": "39",
                "jjfzjyj": "42",
                "jjfzjqj": "18"

            },
        ]
    };
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns:[
                { display: '考核编号', name: 'id', width: 100, align: 'center' ,frozen :true},
                { display: '姓名', name: 'name', width: 100, align: 'center',frozen :true },
                { display:'监区考核',columns:
                    [
                        { display:'考核得分', name:'jqkhkhdf', minWidth:50,width:70},
                        { display:'专项奖分', name:'jqkhzxjf', minWidth:50,width:70}
                    ]},
                { display:'监狱考核',columns:
                    [
                        { display:'专项奖分', name:'jykhzxjf', minWidth:50, width:70},
                        { display:'监狱扣分', name:'jykhjykf', minWidth:50, width:70}
                    ]},
                { display:'风险抵押',columns:
                    [
                        { display:'奖分', name:'fxdyjf', minWidth:50, width:50},
                        { display:'扣分', name:'fxdykf', minWidth:50, width:50}
                    ]
                },
                { display:'分监区实得分', name: 'fjqsdf', width: 70, align: 'center' },
                { display:'监区奖分', name: 'jqjf', width: 70, align: 'center' },
                { display:'监区扣分', name: 'jqkf', width: 70, align: 'center' },
                { display:'否决分数', name: 'fjfs', width: 70, align: 'center' },
                { display:'监区实得分', name: 'jqsdf', width: 80, align: 'center',type:'int' },
                { display:'本月实得分', name: 'bysdf', width: 80, align: 'center',type:'int' },
                { display:'上月累计积分', name: 'syljjf', width: 80, align: 'center',type:'int' },
                { display:'本月奖惩变动',columns:
                    [
                        { display:'分数', name:'byjcbdfs', minWidth:50, width:50},
                        { display:'记功数', name:'byjcbdjgs', minWidth:50, width:50},
                        { display:'表扬数', name:'byjcbdbys', minWidth:50, width:50},
                        { display:'扣分', name:'byjcbdkf', minWidth:50, width:50}
                    ]
                },
                { display:'调整分', name: 'tzf', width: 50, align: 'center' },
                { display:'累计结余',columns:
                    [
                        { display:'结余分数', name:'ljjyjyfs', minWidth:50, width:50},
                        { display:'结余记功', name:'ljjyjyjg', minWidth:50, width:50},
                        { display:'结余表扬', name:'ljjyjyby', minWidth:50, width:50}
                    ]
                },
                { display:'奖惩记录', name: 'jcjl', width: 250, align: 'center' },
                { display:'积极分子',columns:
                    [
                        { display:'省级', name:'jjfzsj', minWidth:50, width:50},
                        { display:'监狱级', name:'jjfzjyj', minWidth:50, width:50},
                        { display:'监区级', name:'jjfzjqj', minWidth:50, width:50}
                    ]
                }
            ],
            fixedCellHeight :false,
            pageSizeOptions: [10, 20, 50, 100],
            width: '100%',
            height:'97%',
            pageSize: 20,
            record: 'total',
            data:Data,
            //url: '',
            //data: 'server',
            //root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            //method: 'get',
            //pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            onBeforeShowData: function ()
            {alert:"not ok"
            },
            onAfterShowdata: function ()
            {alert:"ok"
            }
        });
    $("#pageloading").hide();
});
