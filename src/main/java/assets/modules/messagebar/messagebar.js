define(["avalon","domReady!","mmRequest","../../vendor/avalon.oniui/dropdownlist/avalon.dropdownlist"],
    function(avalon, domReady,mmRequest,home,dropdown){
        //数据:
        var map = {
            "一监区" : ["一分监区","二分监区","三分监区"],
            "二监区" : ["12321分监区","32423分监区","42342分监区"],
            "三监区" : ["一分监区","二分监区","三分监区","分监区","32监区","342分监区"],
            "四监区" : ["1分监区","2分监区","3分监区"],
            "五监区" : ["一分监区","二分监区","三分监区","四分监区","五分监区"]
        }

        var jiAnQuVm = avalon.define({
            $id : "jiAnQu",
            jiAn : "监区",
            first : ["一监区","二监区","三监区","四监区","五监区"],
            second : [],
            firstSelected : "",
            secondSelected : ""
    //        jiAnQ : function(a){
    //            var b = jiAnQuVm.first
    //            alert(b)
    //        }
        });
        jiAnQuVm.second = map[jiAnQuVm.first[1]].concat();
        jiAnQuVm.$watch("firstSelected",function(a){
//            alert('您将进入'+a);
            jiAnQuVm.second = map[a].concat();
            jiAnQuVm.secondSelected = jiAnQuVm.second[0];
//            alert('请选择'+jiAnQuVm.second);
            //window.location.href="home.html";
    //        alert(jiAnQuVm.secondSelected)
    ///////////////////////////////////////////////
        });


        var lianHaoVm = avalon.define({
            $id : "lianHao",
            xm : "",
            dabh : "",
            khbh : "",
            hidden:false
        });

        var souSuoVm = avalon.define({
            $id : "souSuo",
            sou :"搜索"
        })

        avalon.scan();
    })
