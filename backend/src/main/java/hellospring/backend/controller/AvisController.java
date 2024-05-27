package hellospring.backend.controller;
import hellospring.backend.model.avis;
import hellospring.backend.repository.AvisRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AvisController {
    @Autowired
    private AvisRepository avisRepository;
    @PostMapping("/DonnerAvis")
    public ResponseEntity<String> donnerAvis(@RequestParam int idDemande, @RequestParam String commentaire, @RequestParam int idFournisseur) {
       try{
           avis avis= new avis();
       avis.setIdDemande(idDemande);
       avis.setCommentaire(commentaire);
       avis.setUserID(idFournisseur);
       int resultat=avisRepository.AjouterAvis(avis);
       if(resultat!=0){
           return ResponseEntity.ok("Avis soumis avec succès");
       }
       else{
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Échec de la soumission de l'avis");
       }
       }
       catch(Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Échec de la soumission de l'avis : " + e.getMessage());
    }
   }

    @GetMapping("/Getavis")
    public List<avis> getAllavis(@RequestParam int UserId) {

        List<avis> Avis = avisRepository.findavisClient(UserId);
        for (avis avis : Avis) {
            if (avis.getImage() != null) {
                String base64Image = Base64.getEncoder().encodeToString(avis.getImage());
               avis.setImageBase64(base64Image);

            }
        }
        return Avis;
    }
}
