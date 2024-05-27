import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icones from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DemandeFournisseur = () => {
  const [StatusActuel, setStatusActuel] = useState('en-attente');
  const [EnAttente, setEnAttente] = useState([]);
  const [Termine, setTermine] = useState([]);
  const [viewedOrders, setViewedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const fournisseurPassword = route.params?.fournisseurPassword;
  const UserId = route.params?.UserId;

  const ListeCommandeEnAttente = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8082/api/GetDemande?status=en-attente&passWord=${fournisseurPassword}`, {
        method: 'GET',
      });
      const data = await response.json();
      setEnAttente(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes en attente:', error);
    }
  };

  const ListeCommandeTermine = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8082/api/GetDemande?status=termine&passWord=${fournisseurPassword}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTermine(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes terminées:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await ListeCommandeEnAttente();
      await ListeCommandeTermine();
      const storedViewedOrders = await AsyncStorage.getItem('viewedOrders');
      if (storedViewedOrders) {
        setViewedOrders(JSON.parse(storedViewedOrders));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (StatusActuel === 'termine') {
      const fetchData = async () => {
        setLoading(true);
        await ListeCommandeTermine();
        setLoading(false);
      };
      fetchData();
    }
  }, [StatusActuel]);

  const StatusCmdEnAttente = () => {
    setStatusActuel('en-attente');
  };

  const StatusCmdTermine = () => {
    setStatusActuel('termine');
  };

  const markOrderAsCompleted = (status, IdDemande) => {
    fetch(`http://10.0.2.2:8082/api/ChangerStatus?status=${status}&IdDemande=${IdDemande}`, {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          Alert.alert('Succès', 'Le statut a été mis à jour.');
          ListeCommandeEnAttente();
        } else {
          console.error('Échec de la mise à jour du statut de la commande');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du statut de la commande:', error);
      });
  };

  const markOrderAsViewed = async (IdDemande) => {
    const updatedViewedOrders = [...viewedOrders, IdDemande];
    setViewedOrders(updatedViewedOrders);
    await AsyncStorage.setItem('viewedOrders', JSON.stringify(updatedViewedOrders));
  };

  const ListeProduit = ({ order, index }) => (
    <View style={[styles.listeProduit, StatusActuel === 'en-attente' && !viewedOrders.includes(order.idDemande) && styles.viewedOrder]}>
      <View style={styles.image}>
        <FastImage
          source={{ uri: `data:image/jpeg;base64,${order.imageBase64}` }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.information}>
        <Text style={styles.informationTexte}>Quantité : {order.quantite}</Text>
        <Text style={styles.informationTexte}>NomClient : {order.userName}</Text>
        <Text style={styles.informationTexte}>Adresse : {order.adress}</Text>
        <Text style={styles.informationTexte}>Téléphone : {order.numero}</Text>
        <Text style={styles.informationTexte}>Numéro de commande : {order.idDemande}</Text>
        {StatusActuel === 'en-attente' && (
          <View style={styles.actionsContainer}>
            <View style={styles.consulte}>
              <TouchableOpacity onPress={() => markOrderAsViewed(order.idDemande)} style={styles.viewButton}>
                <Icones name={viewedOrders.includes(order.idDemande) ? "eye" : "eye-off"} size={24} color='#8d6e63' style={viewedOrders.includes(order.idDemande) ? styles.iconViewed : null} />
              </TouchableOpacity>
              <Text style={styles.consulteText}>Consulté</Text>
            </View>
            <TouchableOpacity onPress={() => markOrderAsCompleted('termine', order.idDemande)} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Marqué Terminé</Text>
           
            </TouchableOpacity>
          </View>
        )}
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
          <Icones name="chevron-back-outline" size={20} color="#6D3421" />
        </TouchableOpacity>
        <Text style={styles.titre}>Gérer mes Commandes</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={StatusCmdEnAttente} style={[styles.bouton, StatusActuel === 'en-attente' ? styles.activeBouton : null]}>
          <Text style={styles.boutonText}>Commandes en Attente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={StatusCmdTermine} style={[styles.bouton, StatusActuel === 'termine' ? styles.activeBouton : null]}>
          <Text style={styles.boutonText}>Commandes Terminées</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2F4F4F" />
        </View>
      ) : (
        <FlatList
          data={StatusActuel === 'en-attente' ? EnAttente : Termine}
          keyExtractor={(item, index) => item.idDemande.toString() + index}
          renderItem={({ item, index }) => <ListeProduit order={item} index={index} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8d6e63',
    marginRight: 10,
  },
  rollback: {
    marginRight: 80,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bouton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  boutonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
  },
  activeBouton: {
    backgroundColor: '#dcc7a7',
  },
  listeProduit: {
    borderWidth: 1,
    borderColor: '#F5E6CA',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  viewedOrder: {
    opacity: 0.5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  image: {
    marginLeft: -10,
  },
  information: {
    flex: 1,
    paddingHorizontal: 10,
  },
  informationTexte: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
     // This ensures the elements are spread out evenly
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: '#dcc7a7',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf: 'flex-end', // Align the button to the right
    marginVertical: 5,
    marginLeft:60,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  viewButton: {
    marginLeft:-180,

  },
  iconViewed: {
    color: '#dcc7a7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consulte: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  consulteText: {
    marginTop: 5,
    fontSize: 12,
    color: '#AAA5A5',
    marginLeft:-160,
  },
});

export default DemandeFournisseur;