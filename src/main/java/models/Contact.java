package models;

/**
 * Created by Administrator on 2015/8/17 0017.
 */
public class Contact {
    private String name;
    private String email;
    public String description;
    public int id;
    public Contact(){}
    public String getName(){
        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
