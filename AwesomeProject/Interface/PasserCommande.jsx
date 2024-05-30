import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PasserCommande = ({ route }) => {
  const UserId = route.params?.UserId;
  const { nomfournisseur, regions, serviceId } = route.params;
  const [quantite, setQuantite] = useState('');
  const navigation = useNavigation();

  const PasserCommande = async () => {
    const demande = {
      quantite: quantite,
      UserId: UserId,
      idService: serviceId,
    };

    try {
      const response = await fetch('http://10.0.2.2:8082/api/demande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demande),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Succès', data.message);
        navigation.navigate('PresentationProduit', { UserId: UserId });
      } else {
        Alert.alert('Erreur', data.message);
        navigation.navigate('PresentationProduit', { UserId: UserId });
      }
    } catch (error) {
      console.log('Erreur', error);
    }
  };

  const creerCompte = () => {
    navigation.navigate('Inscrire');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terminé ma commande</Text>
      <Text style={styles.label}>Numéro :</Text>
      <TextInput style={styles.input} value={serviceId.toString()} editable={false} />
      <Text style={styles.label}>Nom du fournisseur :</Text>
      <TextInput style={styles.input} value={nomfournisseur} editable={false} />
      <Text style={styles.label}>Région :</Text>
      <TextInput style={styles.input} value={regions} editable={false} />
      <Text style={styles.label}>Quantité :</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
         placeholder="la quntité que je veux"
        value={quantite}
        placeholderTextColor="#4B3E2A"
        onChangeText={text => setQuantite(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { flex: 2 }]} onPress={PasserCommande}>
          <Text style={styles.buttonText}>envoyez commande</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => navigation.navigate('PresentationProduit', { UserId })}>
          <Text style={styles.buttonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createAccountContainer}>
      <Text style={styles.createAccountText}>vous avez pas de compte? </Text>
        <TouchableOpacity style={styles.createAccountButton} onPress={creerCompte}>
          <Text style={styles.createAccountButtonText}>Créer mon compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#8d6e63',
    fontFamily: 'serif',
    textAlign: 'center',
     borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#4B3E2A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8d6e63',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color:'#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#dcc7a7',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,

  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 14,
  },
  createAccountContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  createAccountButton: {
    backgroundColor: '#dcc7a7',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    fontSize: 16,
    color: '#000000',


  },
  createAccountText: {
      fontSize: 16,
      color: '#000000',
      marginBottom:15,
    },
});

export default PasserCommande;
