package hellospring.backend.repository;

import hellospring.backend.model.service;
import org.springframework.stereotype.Repository;
import java.sql.*;
        import java.util.ArrayList;
import java.util.List;

@Repository
public class ServiceRepository  {
    public Connection connexion(){
        Connection conn= null ;
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/mobapp","root","");
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return conn;
    }

    public List<service> findAll() {
        List<service> services = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT s.ServiceId, s.regions, s.prix, s.Description, s.image, u.UserName ,s.categorie " +
                "FROM service s " +
                "INNER JOIN usertable u ON s.idfournisseur = u.UserId";
        try (PreparedStatement statement = conn.prepareStatement(select)) {
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                service service = new service();
                service.setServiceId(resultSet.getInt("ServiceId"));
                service.setNomfournisseur(resultSet.getString("UserName"));
                service.setPrix(resultSet.getDouble("prix"));
                byte[] imageBytes = resultSet.getBytes("image");
                service.setImage(imageBytes);
                service.setRegions(resultSet.getString("regions"));
                service.setCategorie(resultSet.getString("categorie"));
                service.setDescription(resultSet.getString("Description"));
                services.add(service);

            }
        } catch (Exception e) {
            System.out.println(e.toString());
            System.out.println("problemee Recupertaion");
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (Exception e) {
                    System.out.println(e.toString());
                }
            }
        }
        return services;
    }
    public boolean addServiceForFournisseur(service service, int idFournisseur) {
        Connection conn = connexion();
        String insertQuery = "INSERT INTO service (prix, categorie, image, idfournisseur, regions, Description) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement statement = conn.prepareStatement(insertQuery)) {
            statement.setDouble(1, service.getPrix());
            statement.setString(2, service.getCategorie());
            statement.setBytes(3, service.getImage());
            statement.setInt(4, idFournisseur);
            statement.setString(5, service.getRegions());
            statement.setString(6, service.getDescription());

            int rowsAffected = statement.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            System.out.println("Erreur lors de l'ajout du service pour le fournisseur: " + e.toString());
            return false;
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    System.out.println("Erreur lors de la fermeture de la connexion: " + e.toString());
                }
            }
        }
    }
}