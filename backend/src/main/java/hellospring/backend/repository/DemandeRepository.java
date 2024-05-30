package hellospring.backend.repository;
import hellospring.backend.model.Demande;
import org.springframework.stereotype.Repository;
import java.sql.*;
import java.util.*;

@Repository

public class DemandeRepository {
    public Connection connexion() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/mobapp", "root", "");
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return conn;
    }

    public int selectionnerfournisseur(int numeroService) {
        Connection conn = connexion();
        int Idfournisseur = 0;
        try {
            PreparedStatement statement = conn.prepareStatement("SELECT idfournisseur FROM service where ServiceId=?");
            statement.setInt(1, numeroService);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Idfournisseur = resultSet.getInt("idfournisseur");
            }
            return Idfournisseur;
        } catch (Exception E) {
            System.out.println(E.toString());
            return Idfournisseur;
        }
    }

    public int AjouterCommande(Demande D) {
        Connection conn = connexion();
        int resultat = 0;
        try {
            PreparedStatement statement = conn.prepareStatement("INSERT INTO Demande (IdFournisseur,IdService,quantite,IdClient) VALUES (?,?,?,?)");
            statement.setInt(1, D.getIdFournisseur());
            statement.setInt(2, D.getIdService());
            statement.setInt(3, D.getQuantite());
            statement.setInt(4, D.getIdClient());
            resultat = statement.executeUpdate();
        } catch (Exception E) {
            System.out.println(E.toString());
            System.out.println(" Probleme enregistrement demande");
        }
        return resultat;
    }

    public List<Demande> findAll(String status, int UserId) {
        List<Demande> demandes = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT u2.UserName as nomClient, u2.mobile as mobileclient, D.IdDemande, D.status, D.quantite, u2.adress as adressClient, s.image " +
                "FROM Demande D " +
                "INNER JOIN usertable u ON D.IdFournisseur = u.UserId " +
                "INNER JOIN service s ON D.IdService = s.ServiceId " +
                "INNER JOIN usertable u2 ON D.IdClient = u2.UserId " +
                "WHERE D.status = ? AND u.UserId = ?";
        try (PreparedStatement statement = conn.prepareStatement(select)) {
            statement.setString(1, status);
            statement.setInt(2, UserId);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Demande demande = new Demande();
                demande.setIdDemande(resultSet.getInt("IdDemande"));
                System.out.println(resultSet.getInt("IdDemande"));
                demande.setStatus(resultSet.getString("status"));
                demande.setUserName(resultSet.getString("nomClient"));
                demande.setQuantite(resultSet.getInt("quantite"));
                demande.setAdress(resultSet.getString("adressClient"));
                demande.setNumero(resultSet.getString("mobileclient"));
                byte[] imageBytes = resultSet.getBytes("image");
                demande.setImage(imageBytes);

                demandes.add(demande);
            }
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return demandes;
    }
    public int modifier (String status,int IdDemande){
        Connection conn = connexion();
        int resultat = 0;
        try {
            PreparedStatement statement = conn.prepareStatement(" Update demande set status=?  where IdDemande =? ");
            statement.setString(1, status);
            statement.setInt(2, IdDemande);
            resultat = statement.executeUpdate();
        } catch (Exception E) {
            System.out.println(E.toString());
            System.out.println(" Probleme enregistrement demande");
        }
        return resultat;
    }

    public List<Demande> findDemandeClient(int IdClient) {
        List<Demande> demandes = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT D.IdDemande, D.status, D.quantite, s.prix, s.image,u.UserId as IdFournisseur, u.UserNAME as nomfournisseur " +
                "FROM Demande D " +
                "INNER JOIN usertable u ON D.IdFournisseur = u.UserId " +
                "INNER JOIN service s ON D.IdService = s.ServiceId " +
                "INNER JOIN usertable u2 ON D.IdClient = u2.UserId " +
                "WHERE D.IdClient = ? ";
        try (PreparedStatement statement = conn.prepareStatement(select)) {
            statement.setInt(1, IdClient);

            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Demande demande = new Demande();
                demande.setStatus(resultSet.getString("status"));
                demande.setQuantite(resultSet.getInt("quantite"));
                demande.setNomFournisseur(resultSet.getString("nomfournisseur"));
                byte[] imageBytes = resultSet.getBytes("image");
                demande.setImage(imageBytes);
                demande.setPrix(resultSet.getDouble("prix"));
                demande.setIdDemande(resultSet.getInt("IdDemande"));
                demande.setIdFournisseur(resultSet.getInt("IdFournisseur"));

                demandes.add(demande);
            }
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return demandes;
    }



}



