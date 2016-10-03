var wei = new Object();
wei.selectedCriminal = null;

wei.selectCriminal = function(id){
    wei.selectedCriminal = id;
    $('.xinxiguanliSubMenu').show();
    $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
        var html = "当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
        //alert(res.dabh)
        if ("fenjianqu" in res&&null!==res.fenjianqu){
            html = html + " | 分监区："+res.fenjianqu.name;
        }
        $('#wei-info-bar').html(html);
    });

    for (var i = 0; i < tabItems.length; i++)
    {
        var o = tabItems[i];
        if(o.tabid!=='menu-renyuanliebiao'){
            weiLayoutTab.reload(o.tabid);
        }
    }

}

wei.selectCriminalData = function(res){
    wei.selectedCriminal = res.id;
    $('.xinxiguanliSubMenu').show();

        var html = "当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
        //alert(res.dabh)
        if ("fenjianqu" in res&&null!==res.fenjianqu){
            html = html + " | 分监区："+res.fenjianqu.name;
        }
        $('#wei-info-bar').html(html);



    for (var i = 0; i < tabItems.length; i++)
    {
        var o = tabItems[i];
        if(o.tabid!=='menu-renyuanliebiao'){
            weiLayoutTab.reload(o.tabid);
        }
    }

};
wei.deselectCriminal = function(){
    wei.selectedCriminal = null;
    $('.xinxiguanliSubMenu').hide();
    $('#wei-info-bar').html("");
}

//减刑报表url设定
//wei.url = null;

