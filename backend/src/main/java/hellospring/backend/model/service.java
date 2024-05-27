package hellospring.backend.model;

import javax.persistence.*;

public class service {
    private int ServiceId;
    private double prix;
    private String categorie;
    private byte[] image;
    private String regions;
    private int idfournisseur;

    public int getIdfournisseur() {
        return idfournisseur;
    }

    public void setIdfournisseur(int idfournisseur) {
        this.idfournisseur = idfournisseur;
    }

    public service(double prix, String categorie, byte[] image, String regions, int idfournisseur, String description) {
        this.prix = prix;
        this.categorie = categorie;
        this.image = image;
        this.regions = regions;
        this.idfournisseur = idfournisseur;
        this.description = description;
    }

    private String description;

    private String nomfournisseur;
    public String getNomfournisseur() {
        return nomfournisseur;
    }

    public void setNomfournisseur(String nomfournisseur) {
        this.nomfournisseur = nomfournisseur;
    }
    // Constructeurs, getters et setters

    public service() {
    }

    private String imageBase64;

   
    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
    public service(double prix, String categorie, byte[] image,String regions, String description) {
        this.prix = prix;
        this.categorie = categorie;
        this.image = image;
        this.regions = regions;
        this.description = description;
    }

    // Getters et setters

    public int getServiceId() {
        return ServiceId;
    }

    public void setServiceId(int ServiceId) {
        this.ServiceId = ServiceId;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getRegions() {
        return regions;
    }

    public void setRegions(String regions) {
        this.regions = regions;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
