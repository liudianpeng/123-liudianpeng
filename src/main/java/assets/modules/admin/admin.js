define(["avalon","domReady!","mmRequest",
        "text!modules/admin/admin.html","./../../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid"],
       function(avalon,domReady,mmRequest,admin,smartgrid){

           avalon.templateCache.admin = admin;

           var adminVm = avalon.define({
               $id: "admin",
               sgOpt:{
                   $skipArray: ["pager"],
                   selectable: {
                       type: "Checkbox"
                   },
                   isAffix: true,
                   pager: {
                       perPages: 10,
                       onJump: function(e, data) {
                           location.href = "#page=" + data.currentPage;
                           adminVm.getData(data.currentPage);
                       },
                       canChangePageSize : false
                   },
                   data: [{}],
                   columns: [
                       {
                           key : "city",
                           name : "城市",
                           sortable : false,
                           width: 100
                       }, {
                           key: "name",
                           name: "名称",
                           sortable: false,
                           width: 200
                       }, {
                           key : "address",
                           name : "地址",
                           sortable : false,
                           width: 200
                       }, {
                           key : "startTime",
                           name : "开始时间",
                           width: 200
                       }
                   ]
               },
               getData: function(page){
                   var url = "";
                   if(page%2==0){
                       url = "/api/item1.json";
                   }else{
                       url = "/api/item2.json";
                   }
                   avalon.get(url,[],function(data){
                       var length = data.length;
                       var res = [];
                       for(var i = 0;i<length;i++){
                           var obj = data[i];
                           res.push({
                               selected: false,
                               name: obj.name,
                               city: obj.city,
                               address: obj.address,
                               startTime: obj.startTime
                           });
                       }
                       avalon.vmodels.sg.data = res.slice(0,10);
                       var pagerInterval = setInterval(function(){
                           if (avalon.vmodels.sg.pager.totalItems) {
                               avalon.vmodels.sg.pager.totalItems = length;
                               clearInterval(pagerInterval);
                           }else{pagerInterval();}
                       },10);

                       avalon.vmodels.sg.render();
                   },"json");
               }
           });

           adminVm.getData(1);
           avalon.vmodels.root.body = "admin";
       });
