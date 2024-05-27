package hellospring.backend.controller;

import java.security.Provider;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import hellospring.backend.model.service;
import hellospring.backend.repository.ServiceRepository;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<service> getAllServices() {
        List<service> services = serviceRepository.findAll();
        for (service service : services) {
            if (service.getImage() != null) {
                String base64Image = Base64.getEncoder().encodeToString(service.getImage());
                service.setImageBase64(base64Image);

            }
        }
        return services;
    }
    @PostMapping("/AjouterProduit")
    public ResponseEntity<String> addService(@Valid @RequestBody Map<String, String> service) {
        try {
            int idfournisseur = Integer.parseInt(service.get("UserId"));
            service newService = new service();
            newService.setPrix(Double.parseDouble(service.get("prix")));
            newService.setCategorie(service.get("categorie"));
            newService.setRegions( service.get("regions"));
            newService.setDescription( service.get("description"));
            //convertir l'imageBase64 en tableau de bytes avant de l'ajouter
            newService.setImage(Base64.getDecoder().decode(service.get("imageBase64")));

            // Appeler la méthode addServiceForFournisseur de votre ServiceRepository
            boolean ajoutReussi = serviceRepository.addServiceForFournisseur(newService, idfournisseur);

            if (ajoutReussi) {
                return new ResponseEntity<>("Service ajouté avec succès.", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Une erreur s'est produite lors de l'ajout du service.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de l'ajout du service: " + e.getMessage());
            return new ResponseEntity<>("Une erreur s'est produite lors de l'ajout du service: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}