package utils.MyUtils.MySpider;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by Peng on 2016/8/8.
 * "宇佳物流点抓取":
 * 需要设计一个Wuliu封装类，来存储所有抓取到的对象。
 */


@Entity
@javax.persistence.Table(name="wuliu_detail")
public class Wuliu {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private Long wuliu_id;
    private String full_name;
    private String province;
    private String daqu;
    private String chengshi;
    private String fuwu;
    private String jingyingfangshi;

    private String quxian;//天桥区
    private String quyu;//总站,黄台
    private String phone;//电话
    private String name;//杜敏
    private String shouji;//手机
    private String address;//:二环北路大鲁庄桥洞北行10米西行100米宇佳物流园

    private String remark ;
    private String created;
    private String modified;
    private String status;
    private String enabled;
    private String is_daohuo;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWuliu_id() {
        return wuliu_id;
    }

    public void setWuliu_id(Long wuliu_id) {
        this.wuliu_id = wuliu_id;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDaqu() {
        return daqu;
    }

    public void setDaqu(String daqu) {
        this.daqu = daqu;
    }

    public String getChengshi() {
        return chengshi;
    }

    public void setChengshi(String chengshi) {
        this.chengshi = chengshi;
    }

    public String getFuwu() {
        return fuwu;
    }

    public void setFuwu(String fuwu) {
        this.fuwu = fuwu;
    }

    public String getJingyingfangshi() {
        return jingyingfangshi;
    }

    public void setJingyingfangshi(String jingyingfangshi) {
        this.jingyingfangshi = jingyingfangshi;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuyu() {
        return quyu;
    }

    public void setQuyu(String quyu) {
        this.quyu = quyu;
    }

    public String getQuxian() {
        return quxian;
    }

    public void setQuxian(String quxian) {
        this.quxian = quxian;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getShouji() {
        return shouji;
    }

    public void setShouji(String shouji) {
        this.shouji = shouji;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getModified() {
        return modified;
    }

    public void setModified(String modified) {
        this.modified = modified;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    public String getIs_daohuo() {
        return is_daohuo;
    }

    public void setIs_daohuo(String is_daohuo) {
        this.is_daohuo = is_daohuo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Wuliu wuliu = (Wuliu) o;

        return id.equals(wuliu.id);

    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
