//package controllers.Api;
//
//
//import com.google.common.collect.Lists;
//import com.google.inject.Inject;
//import models.ImportUserDepartment;
//import ninja.Context;
//import ninja.Result;
//import ninja.Results;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class ExcleReadController {
//    @Inject
//    ImportUserDepartment importUserDepartment;
//    public Result excleRead(Context context){
//
//
//        String path = "C:\\Users\\Peng\\Desktop\\";
//        String fileName = "user";
//        String fileType = "xlsx";
//
//        List<Map<String,String>> mapList = Lists.newArrayList();
//        Map<String,String> map=new HashMap<String,String>();
//
////        Map<String,String> mapName=new HashMap<String,String>();
//        try{
//            mapList=importUserDepartment.read(path, fileName, fileType,map);
//        }catch (IOException io){
//            io.printStackTrace();
//        }
//        System.out.println("+++++"+map);
//
//        return Results.json().render(map);
//    }
//
//}
