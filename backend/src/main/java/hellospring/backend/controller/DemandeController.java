package hellospring.backend.controller;

import hellospring.backend.model.Demande;
import hellospring.backend.model.User;
import hellospring.backend.repository.DemandeRepository;
import hellospring.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemandeController {

    @Autowired
    private DemandeRepository demandeRepository;

    @PostMapping("/demande")
        public ResponseEntity<String> enregistrerDemande(@Valid @RequestBody Map<String, String> demande){
        Demande newDemande= new Demande();
        int idService = Integer.parseInt(demande.get("idService"));
        int idFournisseur = demandeRepository.selectionnerfournisseur(idService);
        newDemande.setQuantite( Integer.parseInt(demande.get("quantite")));
        newDemande.setIdService(Integer.parseInt(demande.get("idService")));
        newDemande.setIdFournisseur(idFournisseur);
        newDemande.setIdClient(Integer.parseInt(demande.get("UserId")));
        int resultat = demandeRepository.AjouterCommande(newDemande);
        if (resultat > 0) {
            return ResponseEntity.ok("{\"message\": \"votre demande a été envoyé \"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"probleme de convertir la demande  \"}");
        }
    }
    @GetMapping("/GetDemande")
    public List<Demande> getAllDemandes(@RequestParam String status, @RequestParam String passWord) {

            List<Demande> demandes = demandeRepository.findAll(status, passWord);
            for (Demande demande : demandes) {
                if (demande.getImage() != null) {
                    String base64Image = Base64.getEncoder().encodeToString(demande.getImage());
                    demande.setImageBase64(base64Image);

                }
            }
        return demandes;
    }
    // Dans votre contrôleur backend
    @PostMapping("/ChangerStatus")
    public ResponseEntity<String> modifier(@RequestParam String status, @RequestParam int IdDemande) {
        int resultat = demandeRepository.modifier(status, IdDemande);
        if (resultat != 0) {
            System.out.println("succes ici1");
            return ResponseEntity.ok("Statut de la commande mis à jour avec succès");

        } else {
            System.out.println("probleme ici2");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Échec de la mise à jour du statut de la commande");
        }
    }

    @GetMapping("/demandes_client/{idClient}")
    public ResponseEntity<List<Demande>> getDemandesClient(@PathVariable int idClient) {

        List<Demande> demandesClient = demandeRepository.findDemandeClient(idClient);
        if (demandesClient.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(demandesClient);
        }
    }

}


