var manager;
var circleId = window.parent.document.getElementById("postId").value;
//console.log(circleId)

$(function ()
{
    var jianquid = document.getElementById("jianquId").value;
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: '编号', name: 'cid', isSort: false, width: 100},
                {display: '姓名', name: 'name', isSort: false, width: 100, type: 'text'},
                {
                    display: '抵押分',
                    name: 'diyafen',
                    minWidth: 80,
                    type: 'currency',
                    editor: {type: "currency"},
                    totalSummary: {
                        align: 'left',
                        type: 'sum',
                        render: function (e) {
                            return "<div>抵押分合计:" + e.sum + "</div>";
                        }
                    }
                },
                {display: '奖扣', name: 'jiangkou', isSort: false, minWidth: 100, type: 'text'}
            ],
            enabledEdit: false,
            clickToEdit: false,
            isScroll: false,
            checkbox: false,
            usePager: false,
            width: '100%',
            url:'/api/jifenkaohe/yuzhengke/yuzhengfengxiandiya/get/'+circleId+'/'+jianquid,
            root:'items',
            height: '97%',
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
});










