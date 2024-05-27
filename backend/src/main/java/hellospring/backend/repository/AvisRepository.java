package hellospring.backend.repository;

import hellospring.backend.model.avis;
import org.springframework.stereotype.Repository;
import java.sql.*;
import java.util.*;
@Repository
public class AvisRepository {
    public Connection connexion() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost/mobapp", "root", "");
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return conn;
    }
    public int AjouterAvis(avis s) {
        Connection conn = connexion();
        int resultat = 0;
        try {
            PreparedStatement statement = conn.prepareStatement("INSERT INTO avis (IdDemande,UserId,commentaire) VALUES (?,?,?)");
            statement.setInt(1, s.getIdDemande());
            statement.setInt(2, s.getUserID());
            statement.setString(3,s.getCommentaire());
            resultat = statement.executeUpdate();
        } catch (Exception E) {
            System.out.println(E.toString());
            System.out.println(" Probleme enregistrement avis");
        }
        return resultat;
    }
    public List<avis> findavisClient(int idfournisseur) {
        List<avis> Avis = new ArrayList<>();
        Connection conn = connexion();
        String select = "SELECT A.commentaire, S.image " +
                "FROM avis A " +
                "JOIN demande D ON A.IdDemande = D.IdDemande " +
                "JOIN service S ON D.IdService = S.ServiceId " +
                "WHERE A.UserId = ?";

        try (PreparedStatement statement = conn.prepareStatement(select)) {
            statement.setInt(1, idfournisseur);

            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
               avis avis = new avis();
                avis.setCommentaire(resultSet.getString("commentaire"));
                byte[] imageBytes = resultSet.getBytes("image");
                avis.setImage(imageBytes);
               Avis.add(avis);
            }
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return Avis;
    }

}
