var manager;
$(function () {
    var id = window.parent.wei.selectedCriminal;
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: '亲属姓名', name: 'xm', align: 'left',width: 60},
                {display: '关系', name: 'relation', width: 60,align: 'left', type: 'text'},
                {display: '家庭住址', name: 'jtqh', minWidth: 200, align: 'left',
                    render:function(rowdata){
                        var reg = /[a-zA-Z]/g;
                        return (rowdata.jtqh).replace(reg,"");
                    }

                },

                {display: '工作地点', name: 'dwqh', width: 150,align: 'left'},
                {display: '所在单位', name: 'dwmx', minWidth: 200, align: 'left', type: 'text'},

            ],
            pageSizeOptions: [20, 50, 100],
            height: '98%',
            width: '70%',
            pageSize: 20,
            record: 'total',
            url: '/api/xinxi/shehuiguanxi/list/' + id,
            dataAction: 'server', //服务器处理
            root: 'items',
            usePager: true,       //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            switchPageSizeApplyComboBox: true,
            onBeforeShowData: function () {
                $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
                    var html ="社会关系　　"+ "当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
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
        });
});

function mingxi(rowdata, value) {
    //var jtmx = rowdata.jtmx;

    var jtzhuzhi = kongzhi_zidain(rowdata.jtqh);
    return jtzhuzhi;
}
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