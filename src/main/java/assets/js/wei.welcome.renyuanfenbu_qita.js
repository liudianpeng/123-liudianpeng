var manager;
var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

var fu_data = {
    "items": [
        {
            "jsrs": 2323,
            "zyrs": "769",
            "zydrs":"3",
            "shqjxrs":"9",
            "xm":"2"
        }
    ]
};


$(function () {

    var dialogData = dialog.get('data');
    var jianquId = dialogData.jianquId;


    var api;
    api = '/api/welcome/criminal_fenbu/detail/'+jianquId;

    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '禁闭', name: 'jsrs', width: 40, align: 'center',type: 'coun_color'},
                    {display: '严管', name: 'zyrs', width: 40,align: 'center', type:'coun_color'},
                    {display: '集训', name: 'zydrs', width: 40, align: 'center',type: 'coun_color'},
                    {display: '单独关押', name: 'shqjxrs', width: 40, align: 'center',type: 'coun_color'},
                    {display: '隔离控制', name: 'shqqtrs', width: 40,align: 'center', type:'coun_color'},
                    {display: '暂予监外执行', name: 'ygrs', width: 40, align: 'center',type: 'coun_color'},
                    {display: '解回再审', name: 'jbrs', width: 40,align: 'center', type: 'coun_color'},
                    {display: '离监就医',columns:[
                        {display: '小计', name: 'qthjrs', width: 40,align: 'center',type:'coun_color'},
                        {display: '新康医院西湖苑', name: 'scqglkzrs', width: 90,align: 'center', type:'coun_color'},
                        {display: '社会医院就医', name: 'scqddgyrs', width: 80, align: 'center',type:'coun_color'},
                        {display: '社会医院住院', name: 'scqqtrs', width: 80, align: 'center',type:'coun_color'}
                    ]},
                    {display: '东关押点医院住院', name: 'wtrs', width: 90, align: 'center',type:'coun_color'},
                    {display: '西关押点医院住院', name: 'wyrs', width: 90, align: 'center',type:'coun_color'},
                    {display: '危险分子', name: 'bwrs', width: 40, align: 'center',type:'_color'},
                    {display: '重点人物', name: 'qtrs', width: 40 ,align: 'center',type:'text',
                        render:function(rowdata){
                            var count = rowdata.zrs;
                            if(!!count){
                                var r=parseInt(count);
                                if(r>0){
                                    return "<a href='#' style='color:green;font-weight: 600'>" + count + "</a>"
                                }else{
                                    return "<a href='#'>" + count + "</a>"

                                }
                            }

                        }

                    },
                    {display: '报告人', name: 'bgrxm', minWidth: 200,align: 'center', type:'text'},
                    {display: '报告时间', name: 'bggjsj', minWidth: 100,align: 'center', type:'text'},
                    {display: '值班干警', name: 'zbgj',  minWidth: 300, align: 'center',type:'text'},
                    {display: '报告时间', name: 'bggjsj', minWidth: 100,align: 'center', type: 'text'}
                ],
                headerRowHeight:30,
                //detailColWidth:29,
                //detailHeight:260,
                allowAdjustColWidth:true,
                //pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                //pageSize: 20,
                record: 'total',
                fixedCellHeight:false,
                url: api,
                //data:fu_data,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
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

$.ligerDefaults.Grid.formatters['coun_color'] = function (num, column) {
    //num 当前的值
    //column 列信息
    var count =num;
    if(!!count){
        var r=parseInt(count);
        if(r>0){
            return "<a href='#' style='color:blue;font-weight: 600'>" + count + "</a>"
        }else{
            return "<a href='#' >" + count + "</a>"
        }
    }
};

$.ligerDefaults.Grid.formatters['_color'] = function (num, column) {
    //num 当前的值
    //column 列信息
    var count =num;
    if(!!count){
        var r=parseInt(count);
        if(r>0){
            return "<a href='#' style='color:red;font-weight: 600'>" + count + "</a>"
        }else{
            return "<a href='#' >" + count + "</a>"
        }
    }
};


function reload() {
    manager.reload(1);
}
