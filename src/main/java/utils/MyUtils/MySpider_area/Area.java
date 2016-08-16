package utils.MyUtils.MySpider_area;

/**
 * Created by Peng on 2016/8/16.
 * 抓取来源:http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2015/
 */
public class Area {

    private String province;
    private Long province_id;
    private String city;
    private Long city_id;
    private String conuty;
    private Long conuty_id;
    private String town;
    private Long town_id;
    private String village;
    private Long village_id;

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public Long getProvince_id() {
        return province_id;
    }

    public void setProvince_id(Long province_id) {
        this.province_id = province_id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getCity_id() {
        return city_id;
    }

    public void setCity_id(Long city_id) {
        this.city_id = city_id;
    }

    public String getConuty() {
        return conuty;
    }

    public void setConuty(String conuty) {
        this.conuty = conuty;
    }

    public Long getConuty_id() {
        return conuty_id;
    }

    public void setConuty_id(Long conuty_id) {
        this.conuty_id = conuty_id;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public Long getTown_id() {
        return town_id;
    }

    public void setTown_id(Long town_id) {
        this.town_id = town_id;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public Long getVillage_id() {
        return village_id;
    }

    public void setVillage_id(Long village_id) {
        this.village_id = village_id;
    }
}
