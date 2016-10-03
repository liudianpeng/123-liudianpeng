var manager;
        $(function ()
        {
            var id = window.parent.wei.selectedCriminal;
            var url = '/api/xinxi/fanzuishishi/list/'+id;


                $.getJSON("/api/xinxi/gerenxinxi/"+id,null,function(res){
                    var html = "犯罪事实　　"+"当前犯人："+res.xm+" | 档案编号："+res.dabh+"  | 监区："+res.jianqu.name ;
                    //alert(res.dabh)
                    if ("fenjianqu" in res&&null!==res.fenjianqu){
                        html = html + " | 分监区："+res.fenjianqu.name;
                    }
                    $('#title').html(html);
                });

            $.getJSON(url, function(res){
                //console.log(res)
                if (res.item=="not found"){
                    $(".fanzuishishi-content").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                }else {
                    $(".fanzuishishi-content").html(kongzhi(res.fzss));
                }

            });

        });