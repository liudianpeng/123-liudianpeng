package utils.MyUtils.MySpider_taobao;

/**
 * Created by Peng on 2016/8/17.
 * 图片的url
 */
public class ImgURL {

    private String url;

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ImgURL imgURL = (ImgURL) o;

        return url != null ? url.equals(imgURL.url) : imgURL.url == null;

    }

    @Override
    public int hashCode() {
        return url != null ? url.hashCode() : 0;
    }
}
