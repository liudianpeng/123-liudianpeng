package utils.BCrypt;

import org.mindrot.jbcrypt.BCrypt;

import java.security.NoSuchAlgorithmException;

/**
 * Created by Peng on 2016/8/19.
 */
public class BCrypt_demo {

    public static void main(String[] args) throws NoSuchAlgorithmException
    {
        String  originalPassword = "user";
        String generatedSecuredPasswordHash = BCrypt.hashpw(originalPassword, BCrypt.gensalt(12));
        System.out.println(generatedSecuredPasswordHash);

        boolean matched = BCrypt.checkpw(originalPassword, generatedSecuredPasswordHash);
        System.out.println(matched);
    }
}
