package hellospring.backend.repository;

import hellospring.backend.model.User;
import org.springframework.stereotype.Repository;

import java.sql.*;
@Repository
public class UserRepository  {
    public Connection connexion(){
        Connection conn= null ;
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/mobapp","root","");
        } catch (SQLException e) {
            System.out.println(e.toString());

        }
        return conn;}
    public User selectionerclient(String username, String password) {
        Connection conn = connexion();
        try (PreparedStatement statement = conn.prepareStatement("SELECT * FROM usertable WHERE UserName = ? AND PassWord = ?")){
            statement.setString(1, username);
            statement.setString(2, password);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                User user = new User();
                user.setUserId(resultSet.getInt("UserId"));
                user.setUserName(resultSet.getString("UserName"));
                user.setPassword(resultSet.getString("PassWord"));
                user.setUserType(resultSet.getInt("UserType"));
                return user;
            } else {
                return null;
            }
        }
        catch (Exception e) {
            System.out.println(e.toString());
            System.out.println("probleme 0");
            return null;
        }
    }
    public int AjouterClient(User C){
        Connection conn = connexion();
        int resultat= 0;
        try {
            PreparedStatement statement = conn.prepareStatement("INSERT INTO usertable (UserName,PassWord,email,mobile,adress,ville,UserType) VALUES (?,?,?,?,?,?,?)") ;
            statement.setString(1,C.getUserName());
            statement.setString(2,C.getPassword());
            statement.setString(3,C.getEmail());
            statement.setString(4,C.getMobile());
            statement.setString(5,C.getAddress());
            statement.setString(6,C.getVille());
            statement.setInt(7,C.getUserType());

            resultat= statement.executeUpdate();

        }
        catch (Exception E){
            System.out.println(E.toString());
            System.out.println("probleme 1");
        }
        return resultat;
    }

    public int editerClient(User C) {
        Connection conn = connexion();
        int resultat = 0;
        try {
            PreparedStatement statement = conn.prepareStatement("UPDATE usertable SET UserName=?, email=?, mobile=?, adress=?, ville=? WHERE UserId=?");
            statement.setString(1, C.getUserName());
            statement.setString(2, C.getEmail());
            statement.setString(3, C.getMobile());
            statement.setString(4, C.getAddress());
            statement.setString(5, C.getVille());
            statement.setInt(6, C.getUserId());

            resultat = statement.executeUpdate();
        } catch (Exception E) {
            System.out.println(E.toString());
            System.out.println("probleme 2");
        }
        return resultat;
    }

}