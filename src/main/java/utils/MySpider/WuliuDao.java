package utils.MySpider;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.persist.Transactional;
import org.apache.commons.lang.StringUtils;

import javax.persistence.EntityManager;

/**
 * Created by Peng on 2016/8/8.
 * dao
 */
@Transactional
public class WuliuDao {

    @Inject
    Provider<EntityManager> entitiyManagerProvider;
    
    public Wuliu save(Wuliu wuliu){
        if(StringUtils.isBlank(wuliu.getQuxian())
                ||StringUtils.isBlank(wuliu.getQuyu())
                ||StringUtils.isBlank(wuliu.getAddress())
                ||StringUtils.isBlank(wuliu.getPhone())
                ||StringUtils.isBlank(wuliu.getName())
                ||StringUtils.isBlank(wuliu.getShouji())){
            return null;
        }else{
            EntityManager em = entitiyManagerProvider.get();
            em.persist(wuliu);
            em.flush();
            return wuliu;
        }
    }

}
