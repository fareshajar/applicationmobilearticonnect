import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icone from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Inscrire = () => {
  const [UserName, setUserName] = useState('');
  const [PassWord, setPassWord] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [adress, setadress] = useState('');
  const [ville, setville] = useState('');
  const navigation = useNavigation();

  const EnregistrerClient = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8082/api/EnregistrerClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName, PassWord, email, mobile, adress, ville }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Succès', data.message);
        navigation.navigate('Pagelogin');
      } else {
        Alert.alert('Erreur', data.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
  };

  const EnregistrerFournisseur = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8082/api/EnregistrerFournisseur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName, PassWord, email, mobile, adress, ville }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Succès', data.message);
        navigation.navigate('Pagelogin');
      } else {
        Alert.alert('Erreur', data.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer plus tard.');
    }
  };
  const Pagelogin = () => {
      navigation.navigate('Pagelogin');
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelIcon} onPress={Pagelogin}>
        <Icon name="close" size={24} color="#dcc7a7" />
      </TouchableOpacity>

      <View style={styles.titreContainer}>
        <Text style={styles.titreText}>S'inscrire</Text>
        <Text style={styles.soustitreText}>Bienvenue dans notre communauté</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icon name="user" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={UserName}
            onChangeText={setUserName}
            style={styles.textInput}
            placeholder="Nom d'utilisateur"
            placeholderTextColor="#4B3E2A"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icon name="unlock" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={PassWord}
            onChangeText={setPassWord}
            style={styles.textInput}
            placeholder="Mot de passe"
            placeholderTextColor="#4B3E2A"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icon name="mail" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={email}
            onChangeText={setemail}
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#4B3E2A"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icon name="phone" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={mobile}
            onChangeText={setmobile}
            style={styles.textInput}
            placeholder="mon numéro "
            placeholderTextColor="#4B3E2A"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icone name="map-pin" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={adress}
            onChangeText={setadress}
            style={styles.textInput}
            placeholder="mon adresse"
            placeholderTextColor="#4B3E2A"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icons name="home-city-outline" size={30} color='#8d6e63' />
          </View>
          <TextInput
            value={ville}
            onChangeText={setville}
            style={styles.textInput}
            placeholder="ma ville"
            placeholderTextColor="#4B3E2A"
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonClient} onPress={EnregistrerClient}>
          <Text style={styles.buttonText}>Client</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonfournisseur} onPress={EnregistrerFournisseur}>
          <Text style={styles.buttonText}>Fournisseur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  titreContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  titreText: {
    fontSize: 26,
    fontWeight: 'bold',
    color:  '#8d6e63',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  soustitreText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'serif',
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 50,
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
    height: 45,
    borderWidth: 1,
    borderColor: '#8d6e63',
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonClient: {
    backgroundColor: '#dcc7a7',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '48%',
  },
  buttonfournisseur: {
    backgroundColor: '#dcc7a7',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '48%',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelIcon: {
    top: -20,
    paddingLeft:335,
    zIndex: 1,
    marginBottom:-15,

  },
});

export default Inscrire;
