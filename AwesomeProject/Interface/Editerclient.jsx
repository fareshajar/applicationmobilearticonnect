import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditerClient = ({ route }) => {
  const UserId = route.params?.UserId;
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [adress, setadress] = useState('');
  const [ville, setville] = useState('');
  const [username, setusername] = useState('');
  const navigation = useNavigation();

  const editerClient = async () => {
    const demande = {
      UserId: UserId,
      username: username,
      email: email,
      mobile: mobile,
      ville: ville,
      adress: adress,
    };
    console.log(demande);
    try {
      const response = await fetch('http://10.0.2.2:8082/api/editerClient', {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Modifier mon commande</Text>
        <Text style={styles.label}>UserName :</Text>
        <TextInput
          style={styles.input}
          placeholder='username'
          value={username}
          placeholderTextColor="#4B3E2A"
          onChangeText={text => setusername(text)}
        />
        <Text style={styles.label}>Émail :</Text>
        <TextInput
          style={styles.input}
          placeholder='email'
          value={email}
          placeholderTextColor="#4B3E2A"
          onChangeText={text => setemail(text)}
        />
        <Text style={styles.label}>Mobile :</Text>
        <TextInput
          style={styles.input}
          placeholder='mobile'
          value={mobile}
          placeholderTextColor="#4B3E2A"
          onChangeText={text => setmobile(text)}
        />
        <Text style={styles.label}>Ville :</Text>
        <TextInput
          style={styles.input}
          placeholder='ma ville'
          value={ville}
          placeholderTextColor="#4B3E2A"
          onChangeText={text => setville(text)}
        />
        <Text style={styles.label}>Adresse :</Text>
        <TextInput
          style={styles.input}
          placeholder='mon adress'
          value={adress}
          placeholderTextColor="#4B3E2A"
          onChangeText={text => setadress(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { flex: 2 }]} onPress={editerClient}>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => navigation.navigate('PresentationProduit', { UserId })}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: '#000000',
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
    marginBottom: 15,
  },
});

export default EditerClient;
