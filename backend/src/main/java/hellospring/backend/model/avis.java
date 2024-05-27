package hellospring.backend.model;

public class avis {
     private int id_avis;
     private String commentaire;
     private int UserID;
     private int IdDemande;
    private String imageBase64;

    private byte[] image;
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
    public avis(String commentaire, int userID, int idDemande) {
        this.commentaire = commentaire;
        UserID = userID;
        IdDemande = idDemande;
    }

    public avis(String commentaire, int userID, int idDemande, String imageBase64, byte[] image) {
        this.commentaire = commentaire;
        UserID = userID;
        IdDemande = idDemande;
        this.imageBase64 = imageBase64;
        this.image = image;
    }

    public int getId_avis() {
        return id_avis;
    }

    public void setId_avis(int id_avis) {
        this.id_avis = id_avis;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public int getUserID() {
        return UserID;
    }

    public void setUserID(int userID) {
        UserID = userID;
    }

    public int getIdDemande() {
        return IdDemande;
    }

    public void setIdDemande(int idDemande) {
        IdDemande = idDemande;
    }
    public avis(){

    }

}
