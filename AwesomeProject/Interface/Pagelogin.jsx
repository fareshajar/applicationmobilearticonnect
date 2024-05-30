import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Pagelogin = () => {
  const [UserName, setUsername] = useState('');
  const [PassWord, setPassword] = useState('');

  const navigation = useNavigation();

  const Login = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8082/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName, PassWord }),
      });
      const data = await response.json();

      if (response.ok) {
        if (data.userType === 1) {
          const userId = data.userId;
          navigation.navigate('PresentationProduit', { UserId: userId});
        } else if (data.userType === 2) {
          navigation.navigate('Interfacefournisseur', { fournisseurPassword: PassWord, UserId: data.userId });
        }
      } else {
        Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  const CreateAccount = () => {
    navigation.navigate('Inscrire');
  };

  const visitersite = () => {
    navigation.navigate('PresentationProduit');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titreContainer}>
        <Text style={styles.grandtitre}>Bienvenue</Text>
        <Text style={styles.petittitre}>Heureux de vous rencontrer</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icon name="user" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={UserName}
            onChangeText={setUsername}
            style={styles.textInput}
            placeholder="Nom d'utilisateur"
            placeholderTextColor="#808080"
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icon name="unlock" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={PassWord}
            onChangeText={setPassword}
            style={styles.textInput}
            placeholder="Mot de passe"
            placeholderTextColor="#808080"
            secureTextEntry={true}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.buttonconnecterContainer} onPress={Login}>
        <Text style={styles.buttonconnecter}>Se connecter</Text>
      </TouchableOpacity>

      <View style={styles.nouveauUtilisateurContainer}>
        <Text style={styles.nouveauUtilisateurText}>Vous n'avez pas de compte? </Text>
        <TouchableOpacity onPress={CreateAccount}>
          <Text style={styles.createAccountText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.visiterContainer}>
        <TouchableOpacity style={styles.visiterButton} onPress={visitersite}>
          <Icon name="eyeo" size={20} color='#8d6e63' />
          <Text style={styles.visiterText}>Visiter le site</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff', // Blanc foncé
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  grandtitre: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8d6e63', // Marron
  },
  petittitre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Orange
  },
  inputContainer: {
    marginBottom: 30,
    marginTop: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333', // Marron
    backgroundColor: '#FFFFFF', // Blanc
  },
  buttonconnecterContainer: {
    backgroundColor: '#dcc7a7', // Marron foncé
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    marginBottom: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonconnecter: {
    color: '#333', // Blanc
    fontSize: 16,
    fontWeight: 'bold',

  },
  nouveauUtilisateurContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  nouveauUtilisateurText: {
    fontSize: 16,
    color: '#000000', // Marron
  },
  createAccountText: {
    color: '#8d6e63', // Orange
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  visiterContainer: {
    alignItems: 'center',
  },
  visiterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visiterText: {
    color: '#8d6e63', // Vert
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
};

export default Pagelogin;
