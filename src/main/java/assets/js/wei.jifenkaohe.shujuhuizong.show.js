var manager;
var grid=[];
$(function ()
{
    var Data = {
        "Rows": [
            {
                "name": '张琳',
                "fjqqtf": "43",
                "rckf": "43",
                "zhtkf": '11',
                "ldkhf": '23',
                "jckhf": '23',
                "jqzxjf": '23',
                "jqqtf": '23',
                "jqkf": '23',
                "jqjf": '23',
                "jf": '23',
                "jksm": '23',
                "djhm": '23',
                "djzy": '23',
                "jcrq": '23',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            },
            {
                "name": '李治廷',
                "fjqqtf": "13",
                "rckf": "33",
                "zhtkf": '11',
                "ldkhf": '23',
                "jckhf": '23',
                "jqzxjf": '13',
                "jqqtf": '73',
                "jqkf": '83',
                "jqjf": '23',
                "jf": '43',
                "jksm": '33',
                "djhm": '23',
                "djzy": '13',
                "jcrq": '13',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            },
            {
                "name": '王珂',
                "fjqqtf": "13",
                "rckf": "33",
                "zhtkf": '41',
                "ldkhf": '63',
                "jckhf": '23',
                "jqzxjf": '23',
                "jqqtf": '23',
                "jqkf": '23',
                "jqjf": '23',
                "jf": '23',
                "jksm": '23',
                "djhm": '23',
                "djzy": '23',
                "jcrq": '23',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            },
            {
                "name": '武昌',
                "fjqqtf": "13",
                "rckf": "63",
                "zhtkf": '21',
                "ldkhf": '33',
                "jckhf": '73',
                "jqzxjf": '83',
                "jqqtf": '23',
                "jqkf": '23',
                "jqjf": '23',
                "jf": '23',
                "jksm": '23',
                "djhm": '23',
                "djzy": '23',
                "jcrq": '23',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            },
            {
                "name": '李光输',
                "fjqqtf": "13",
                "rckf": "53",
                "zhtkf": '71',
                "ldkhf": '23',
                "jckhf": '23',
                "jqzxjf": '23',
                "jqqtf": '23',
                "jqkf": '23',
                "jqjf": '23',
                "jf": '23',
                "jksm": '23',
                "djhm": '23',
                "djzy": '23',
                "jcrq": '23',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            },
            {
                "name": '郑开化',
                "fjqqtf": "43",
                "rckf": "43",
                "zhtkf": '11',
                "ldkhf": '13',
                "jckhf": '53',
                "jqzxjf": '73',
                "jqqtf": '23',
                "jqkf": '23',
                "jqjf": '23',
                "jf": '23',
                "jksm": '23',
                "djhm": '23',
                "djzy": '23',
                "jcrq": '23',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            },
            {
                "name": '朱和尚',
                "fjqqtf": "13",
                "rckf": "53",
                "zhtkf": '11',
                "ldkhf": '23',
                "jckhf": '23',
                "jqzxjf": '23',
                "jqqtf": '23',
                "jqkf": '23',
                "jqjf": '23',
                "jf": '23',
                "jksm": '23',
                "djhm": '23',
                "djzy": '23',
                "jcrq": '23',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            },
            {
                "name": '宋明家',
                "fjqqtf": "13",
                "rckf": "13",
                "zhtkf": '41',
                "ldkhf": '23',
                "jckhf": '53',
                "jqzxjf": '23',
                "jqqtf": '23',
                "jqkf": '23',
                "jqjf": '23',
                "jf": '23',
                "jksm": '23',
                "djhm": '23',
                "djzy": '23',
                "jcrq": '23',
                "cdrq": '23',
                "bdfs": '23',
                "bdjgs": '23',
                "bdbys": '23',
                "fd": '23',
                "hbxq": '23',
                "dyf": '23',
                "jk": '23',
                "zf": '23'
            }
        ], "Total": "77"
    };
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    { display: '姓名', name: 'name', width: 100, align: 'center',type:'int',isSort:true},
                    { display: '分监区其他分', name: 'fjqqtf',type:'int',minWidth :100,  align: 'center',
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }
                    },
                    { display: '日常扣分', name: 'rckf',minWidth :70,  align: 'center', totalSummary:
                    {
                        type: 'sum',
                        align: 'left',
                        render: function (e) {
                            return "<div>合计:" + e.sum + "</div>";
                        }
                    }},
                    { display: '综合调控分', name: 'zhtkf',minWidth :100, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '劳动考核分', name: 'ldkhf',minWidth :100, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '基础考核分', name: 'jckhf',minWidth :100, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '监区专项奖分', name: 'jqzxjf', minWidth :100,type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '监区其他分', name: 'jqqtf', minWidth :100,type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '监区扣分', name: 'jqkf',minWidth :80, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '监区奖分', name: 'jqjf',minWidth :80, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '奖分', name: 'jf',minWidth :100, type:'int', align: 'center',isSort:false ,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '变动分数', name: 'bdfs',minWidth :80, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '变动记功数', name: 'bdjgs',minWidth :100, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '变动表扬数', name: 'bdbys',minWidth :100, type:'int', align: 'center',isSort:false ,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '幅度', name: 'fd',minWidth :100, type:'int', align: 'center',isSort:false,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }},
                    { display: '合并刑期', name: 'hbxq',minWidth :80, type:'', align: 'center',isSort:false
                    },
                    { display: '抵押分', name: 'dyf',minWidth :100, type:'int', align: 'center',isSort:false,
                        totalSummary:
                    {
                        type: 'sum',
                        align: 'left',
                        render: function (e) {
                            return "<div>合计:" + e.sum + "</div>";
                        }
                    } },
                    { display: '奖扣', name: 'jk',minWidth :50, type:'int', align: 'center',isSort:false },
                    { display: '总分', name: 'zf',minWidth :100, type:'int', align: 'center',isSort:false ,
                        totalSummary:
                        {
                            type: 'sum',
                            align: 'left',
                            render: function (e) {
                                return "<div>合计:" + e.sum + "</div>";
                            }
                        }
                    }
                ],
                pageSize: 20,
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                data:Data,
                //url: '/api/jifenkaohe/jiangkoudanjuleibie/list',
                //dataAction: 'server', //服务器处理
                //root: 'items',
                record: 'total',
                usePager: false,       //服务器分页
                alternatingRow: true,
                //method: 'get',
                pagesizeParmName: 'limit',
                checkbox:false,
                isSingleCheck:true,
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function ()
                {
                },
                onAfterShowdata: function ()
                {
                }
            }
        );
});

