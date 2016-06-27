var manager;
var id = window.parent.wei.selectedCriminal;
$(function () {

    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '起始年', name: 'qrq', align: 'left',width: 90},
                    {display: '终止年', name: 'zrq', align: 'left',width: 90},
                    {display: '职业', name: 'position', align: 'left',width: 60},
                    {display: '职务', name: 'duty', align: 'left',width: 120,type: 'text'},
                    {display: '职称', name: 'title',align: 'left', width: 90, type: 'text'},
                    {display: '工作地点', name: 'dwqh',align: 'left', width: 90},
                    {display: '主要简历', name: 'dwmx',align: 'left', width: 200}

                ],
                pageSizeOptions: [20, 50, 100],
                height: '98%',
                width: '60%',
                pageSize: 20,
                record: 'total',
                url: '/api/xinxi/gerenjianli/list/' + id,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,

            onBeforeShowData: function () {
                $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
                    var html = "个人简历　　"+"当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
                    //alert(res.dabh)
                    if ("fenjianqu" in res&&null!==res.fenjianqu){
                        html = html + " | 分监区："+res.fenjianqu.name;
                    }
                    $('#title').html(html);
                });
            },

                onLoaded: function () {
                    var arry = this.getData();
                    //console.log(arry);
                    if (arry.length == 0) {
                        $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                        $(".l-grid-loading").remove();
                    }
                }
            }
        );
});



function getSelected() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请选择行');
        return;
    }
    alert(JSON.stringify(row));
}
function reload() {
    manager.reload(1);
}