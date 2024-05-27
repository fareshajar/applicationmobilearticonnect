import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icones from 'react-native-vector-icons/Ionicons';

const VoirAvisClient = () => {
  const route = useRoute();
  const UserId = route.params?.UserId;
  const [avisList, setAvisList] = useState([]);
  const [loading, setLoading] = useState(true); // Initialiser à true pour afficher l'icône de chargement
  const navigation = useNavigation();
  const fournisseurPassword = route.params?.fournisseurPassword;

  useEffect(() => {
    fetchAvisList();
  }, []);

  const fetchAvisList = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8082/api/Getavis?UserId=${UserId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des avis');
      }
      const data = await response.json();
      setAvisList(data);
      setLoading(false); // Mettre à jour l'état pour masquer l'icône de chargement une fois les avis chargés
    } catch (error) {
      console.error(error);
    }
  };

  const renderAvisItem = ({ item }) => (
    <View style={styles.avisItem}>
      <FastImage
        source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
        style={styles.productImage}
      />
      <View style={styles.avisContainer}>
        <Text style={styles.avis}>Avis:</Text>
        <Text style={styles.commentaire}>{item.commentaire}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.rollback}
          onPress={() => navigation.navigate('Interfacefournisseur', { fournisseurPassword: fournisseurPassword, UserId: UserId })}
        >
          <Icones name="chevron-back-outline" size={24} color="#6D3421" />
        </TouchableOpacity>
        <Text style={styles.titre}>Avis de client</Text>
      </View>
      {loading ? ( // Afficher l'icône de chargement si loading est true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2F4F4F" />
        </View>
      ) : (
        <FlatList
          data={avisList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderAvisItem}
          contentContainerStyle={styles.flatlistContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  rollback: {
    marginRight: 10,

  },
  titre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8d6e63',
    fontWeight: 'bold',
  },
  flatlistContainer: {
    paddingVertical: 20,
  },
  avisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  avisContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center', // Ajouter cette ligne

    },
  avis: {
    color: '#8d6e63',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  commentaire: {
    fontSize: 16,
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VoirAvisClient;
