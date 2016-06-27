/**
 * Created by hanxuemin on 2015/10/22.
 */
define(["avalon","domReady!","mmRequest"],

    function(avalon,domReady,mmRequest){
     var data = [
                {"id": 1, "name": "山东省", "level": 0, "parentid": "0"},
                {"id": 2, "name": "河南省", "level": 0, "parentid": "0"},
                {"id": 11, "name": "聊城市", "level": 1, "parentid": 1},
                {"id": 12, "name": "济南市", "level": 1, "parentid": 1},
                {"id": 111, "name": "东阿县", "level": 2, "parentid": 11},
                {"id": 121, "name": "高新区", "level": 3, "parentid": 12},
                {"id": 122, "name": "历城区", "level": 3, "parentid": 12},
                {"id": 1211, "name": "奥盛大厦", "level": 3, "parentid": 121}
            ];
        var addVm = avalon.define({
            $id: "addArea",
            name:"",
            level:"",
            code:"",
            pinyin:"",
            parentId:"",
            parent: "",
            searchForm:[],
             //  初始化
            setSearchFormInit:function(currNode){
                     var childNodes=addVm.getChildOrg(currNode);
                     if(childNodes.length){
                         addVm.searchForm=[childNodes];
                     }
                 },
            setSearchForm:function(index){
               var currNode=this.value;
               var childNodes=addVm.getChildOrg(currNode);
               if(childNodes.length){
                   addVm.searchForm.push(childNodes);
               }
            },
            getChildOrg:function(id){
                     var retList=[];
                     for (var i = 0; i < data.length; i++) {
                        var elem = data[i]
                        if (elem.parentid != id)
                            continue;
                        retList.push({
                            id: elem.id,
                            name: elem.name,
                            parentid: elem.parentid
                        });
                    }
                     return retList;
            },
//            selectchange: function(a) {
//                addVm.parent = a
//                console.log(addVm.parent);
//             },
         checkAll:function(e){
              e.preventDefault();
              var model = JSON.stringify(addVm.$model);
              avalon.ajax({
                  type: "POST",
                  data: model,
                  url: "/api/xitongguanli/area/create",
                   headers:{
                         'Content-Type': 'application/json'
                   },
                  success: function(res){
                     var obj=res.items;
                    addVm.name=obj.name;
                    addVm.display=obj.display;
                    addVm.level=obj.level;
                    addVm.code=obj.code;
                    addVm.pinyin=obj.pinyin;

//                      window.location="/xitongguanli/yonghuguanli";
                  }
              });
         }
        });
         addVm.setSearchFormInit(0);
         addVm.getChildOrg();
//        addVm.data();
        avalon.scan();
    });

