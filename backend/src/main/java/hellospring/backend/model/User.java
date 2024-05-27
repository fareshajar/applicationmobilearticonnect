package hellospring.backend.model;

public class User {

    private int userId;
    private String UserName;
    private String PassWord;
    private int userType ;
    private String email;
    private String mobile;
    private String address;
    private String ville;

    public User() {
    }
    public User(String email, String mobile, String userName, String password, String address, String ville) {
        this.email = email;
        this.mobile = mobile;
        this.UserName = userName;
        this.PassWord = password;
        this.address = address;
        this.ville = ville;
    }
    public User(String email, String mobile, String userName, String password, String address, String ville, int userType) {
        this.email = email;
        this.mobile = mobile;
        this.UserName = userName;
        this.PassWord = password;
        this.address = address;
        this.ville = ville;
        this.userType=userType;
    }

    public User(String userName, String email, String mobile, String address, String ville) {
        UserName = userName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.ville = ville;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        this.UserName = userName;
    }

    public String getPassword() {
        return PassWord;
    }

    public void setPassword(String password) {
        this.PassWord = password;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }
}
