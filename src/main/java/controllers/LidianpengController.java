package controllers;

import ninja.Context;
import ninja.Result;
import ninja.Results;
import org.mindrot.jbcrypt.BCrypt;

import java.security.NoSuchAlgorithmException;

/**
 * Created by Administrator on 2015/7/28 0028......
 */
public class LidianpengController {
    public Result index(Context context){
        return Results.html();
    }


        public static void main(String[] args) throws NoSuchAlgorithmException
        {
            String  originalPassword = "admin";
            String generatedSecuredPasswordHash = BCrypt.hashpw(originalPassword, BCrypt.gensalt(12));
            System.out.println(generatedSecuredPasswordHash);

            boolean matched = BCrypt.checkpw(originalPassword, generatedSecuredPasswordHash);
            System.out.println(matched);
        }


}
