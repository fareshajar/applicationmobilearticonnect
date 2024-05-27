package hellospring.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hellospring.backend.model.User;
import hellospring.backend.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody Map<String, String> client) {
        String UserName = client.get("UserName");
        String PassWord = client.get("PassWord");
        if (UserName == null || PassWord == null || UserName.isEmpty() || PassWord.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"remplir les deux champs \"}");
        }
        User user = userRepository.selectionerclient(UserName, PassWord);
        if (user != null) {
            int userType = user.getUserType();
            System.out.println(userType);
            int UserId=user.getUserId();
            JSONObject responseData = new JSONObject();
            responseData.put("userType", userType);
            responseData.put("userId", UserId);

            return ResponseEntity.ok(responseData.toString());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"login ou mot de passe incorrecte \"}");
    }

    @PostMapping("/EnregistrerClient")
    public ResponseEntity<String> EnregistrerClient(@Valid @RequestBody Map<String, String> client) {
        String UserName = client.get("UserName");
        String PassWord = client.get("PassWord");
        String email = client.get("email");
        String mobile = client.get("mobile");
        String adress = client.get("adress");
        String ville = client.get("ville");
        int UserType= 2;
        User user = new User(email, mobile, UserName, PassWord, adress, ville,UserType);
        if (UserName == null || PassWord == null || UserName.isEmpty() || PassWord.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"remplir tous les champs\"}");
        }
        int resultat = userRepository.AjouterClient(user);
        if (resultat != 0) {
            return ResponseEntity.ok("{\"message\": \"vous avez été ajouté avec succès\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"réessayez plus tard\"}");
        }
    }
    @PostMapping("/EnregistrerFournisseur")
    public ResponseEntity<String> EnregistrerFournisseur(@Valid @RequestBody Map<String, String> client) {
        String UserName = client.get("UserName");
        String PassWord = client.get("PassWord");
        String email = client.get("email");
        String mobile = client.get("mobile");
        String adress = client.get("adress");
        String ville = client.get("ville");
        int UserType= 2;
        User user = new User(email, mobile, UserName, PassWord, adress, ville,UserType);
        if (UserName == null || PassWord == null || UserName.isEmpty() || PassWord.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"remplir tous les champs\"}");
        }
        int resultat = userRepository.AjouterClient(user);
        if (resultat != 0) {
            return ResponseEntity.ok("{\"message\": \"vous avez été ajouté avec succès\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"réessayez plus tard\"}");
        }
    }

    @PostMapping("/editerClient")
    public ResponseEntity<String> editerClient(@Valid @RequestBody Map<String, String> client) {
        String UserName = client.get("username");
        String email = client.get("email");
        String mobile = client.get("mobile");
        String adress = client.get("adress");
        String ville = client.get("ville");
        int UserId = Integer.parseInt(client.get("UserId"));
        User user = new User(UserName,email, mobile, adress, ville);
        user.setUserId(UserId);
        int resultat = userRepository.editerClient(user);
        if (resultat != 0) {
            return ResponseEntity.ok("{\"message\": \"Les données ont été mises à jour avec succès\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Une erreur s'est produite lors de la mise à jour des données\"}");
        }
    }
}
