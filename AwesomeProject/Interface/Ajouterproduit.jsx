import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icones from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

function AjouterProduit() {
  const [image, setImage] = useState(null);
  const [prix, setPrix] = useState('');
  const [regions, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const defaultImage = require('../image/5.png');
  const UserId = route.params?.UserId;
  const fournisseurPassword = route.params?.fournisseurPassword;

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé la sélection de l'image.");
      } else if (response.errorCode) {
        console.log('Erreur : ', response.errorMessage);
      } else {
        const uri = response.assets && response.assets.length > 0 ? response.assets[0].uri : null;
        setImage(uri);
      }
    });
  };

  const convertToBase64 = async (uri) => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
          };
          reader.readAsDataURL(blob);
        })
        .catch(error => reject(error));
    });
  };

  const handleSubmit = async () => {
    try {
      let base64Image = null;
      if (image) {
        base64Image = await convertToBase64(image);
      } else {
        const defaultImageUri = Image.resolveAssetSource(defaultImage).uri;
        base64Image = await convertToBase64(defaultImageUri);
      }

      const dataToSend = {
        imageBase64: base64Image,
        prix,
        regions,
        description,
        categorie,
        UserId,
      };

      const response = await fetch('http://10.0.2.2:8082/api/services/AjouterProduit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      console.log(dataToSend)

      const text = await response.text();

      if (response.ok) {
        Alert.alert('Succès', 'Service ajouté avec succès.');
        navigation.navigate('Ajouterproduit', { fournisseurPassword:fournisseurPassword,UserId: UserId });
      } else {
        console.error('Réponse non ok:', text); // Log de la réponse brute
        try {
          const result = JSON.parse(text);
          Alert.alert('Erreur', result.message || 'Erreur lors de l\'ajout du service.');
        } catch (error) {
          Alert.alert('Erreur', text || 'Erreur lors de l\'ajout du service.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout du service.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ffffff' }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.rollback}
            onPress={() => navigation.navigate('Interfacefournisseur', { fournisseurPassword: fournisseurPassword, UserId: UserId })}
          >
            <Icones name="chevron-back-outline" size={24} color='#8d6e63' />
          </TouchableOpacity>
          <Text style={styles.title}>Ajouter un produit</Text>
        </View>
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Image source={defaultImage} style={styles.image} />
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Prix"
          placeholderTextColor="#000000"
          value={prix}
          onChangeText={text => setPrix(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Région"
          placeholderTextColor="#000000"
          value={regions}
          onChangeText={text => setRegion(text)}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categorie}
            onValueChange={(itemValue) => setCategorie(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionnez une catégorie" value="" />
            <Picker.Item label="Tapissier" value="tapissier" />
            <Picker.Item label="Poterie" value="poterie" />
            <Picker.Item label="Luminaire" value="luminaire" />
            <Picker.Item label="Bijouterie" value="bijouterie" />
          </Picker>
        </View>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Description"
          placeholderTextColor="#000000"
          value={description}
          onChangeText={text => setDescription(text)}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
  },
  rollback: {
    position: 'absolute',
    left: -80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8d6e63',
    marginLeft: 24,
  },
  imagePicker: {
    width: 200,
    height: 180,
    backgroundColor: '#d7ccc8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFFAF1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFFAF1',
    color: '#000000',
  },
  descriptionInput: {
    height: 100,
    maxHeight: 100,
    marginBottom:20,
  },
  pickerContainer: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFAF1',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: '#FFFAF1',
  },
  picker: {
    width: '100%',
    height: 40,
    color: '#000000',
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: '#dcc7a7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default AjouterProduit;