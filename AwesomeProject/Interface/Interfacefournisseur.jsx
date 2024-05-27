import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icones from 'react-native-vector-icons/Ionicons';

const Interfacefournisseur = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const fournisseurPassword = route.params?.fournisseurPassword;
  const UserId = route.params?.UserId;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcon}>
          <TouchableOpacity style={styles.rollback} onPress={() => navigation.navigate('Pagelogin')}>
            <Icones name="chevron-back-outline" size={24} color="#6D3421" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Bienvenue</Text>
        </View>
        <Text style={styles.description}>les outils pour gérer mon service</Text>
      </View>

      <View style={styles.mainContainer}>
      <TouchableOpacity style={[styles.containerItem, styles.iconContainer3]} onPress={() => navigation.navigate('Ajouterproduit', { fournisseurPassword, UserId })}>
                <Icon1 name="add-circle-outline" size={40} color="#FFFFFF" />
                <Text style={styles.text}>Ajouter un produit</Text>
       </TouchableOpacity>
        <TouchableOpacity style={[styles.containerItem, styles.iconContainer2]} onPress={() => navigation.navigate('DemandeFournisseur', { fournisseurPassword, UserId })}>
          <Icon2 name="clipboard" size={40} color="#FFFFFF" />
          <Text style={styles.text}>Voir commandes</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.containerItem, styles.iconContainer1]} onPress={() => navigation.navigate('VoirAvisClient', { fournisseurPassword, UserId })}>
          <Icon name="comment-o" size={40} color="#FFFFFF" />
          <Text style={styles.text}>Voir les avis des clients</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: 'flex-start', // Aligner à gauche
    marginBottom:-20,
    width: "100%",

  },
  headerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
  },
  rollback: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8d6e63',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left', // Aligner le texte de description à gauche
    marginTop: 10,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItem: {
    width: '80%',
    height: 120,
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

  },
  iconContainer1: {
    backgroundColor: '#8d6e63',
  },
  iconContainer2: {
    backgroundColor: '#6D3421',
  },
  iconContainer3: {
    backgroundColor: '#dcc7a7',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Interfacefournisseur;
