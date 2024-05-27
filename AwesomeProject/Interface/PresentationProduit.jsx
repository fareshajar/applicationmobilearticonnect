import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icones2 from 'react-native-vector-icons/FontAwesome5';
import Icones3 from 'react-native-vector-icons/FontAwesome';
import Icones4 from 'react-native-vector-icons/Feather';
import Icones from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const PresentationProduit = () => {
  const route = useRoute();
  const UserId = route.params?.UserId;
  const [touteDescription, settouteDescription] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [region, setRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigation = useNavigation();

  const recuperationdedonner = () => {
    fetch('http://10.0.2.2:8082/api/services')
      .then(response => response.json())
      .then(data => {
        setTableData(data);
        setOriginalData(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false); // Also set loading to false in case of error
      });
  };

  useEffect(() => {
    recuperationdedonner();
  }, []);

  useEffect(() => {
    presentationproduit();
  }, [region, selectedCategory]);

  const commander = (product) => {
    navigation.navigate('PasserCommande', {
      nomfournisseur: selectedProduct?.nomfournisseur,
      regions: selectedProduct?.regions,
      serviceId: selectedProduct?.serviceId,
      UserId: UserId
    });
  };

  const voircommande = () => {
    navigation.navigate('MesCommande', { UserId: UserId });
  };
  const editerclient= () => {
      navigation.navigate('Editerclient', { UserId: UserId});
    };

  const presentationproduit = () => {
    const produitsFiltres = originalData.filter(produit => {
      const regionMatch = !region || produit.regions.toLowerCase() === region.toLowerCase();
      const selectedCategoryMatch = !selectedCategory || produit.categorie.toLowerCase() === selectedCategory.toLowerCase();
      return regionMatch && selectedCategoryMatch;
    });

    if (region || selectedCategory) {
      if (produitsFiltres.length === 0) {
        return (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>Nous ne disposons pas de produit concernant votre recherche.</Text>
          </View>
        );
      }
    }

    return produitsFiltres.map((produit, index) => (
      <View key={index} style={styles.row}>
        <TouchableOpacity style={styles.produitContainer} onPress={() => handleProductSelection(produit)}>
          <View style={styles.ContainerPro}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${produit.imageBase64}` }}
              style={styles.produitImage}
              resizeMode="cover"
              onLoadEnd={() => setLoading(false)} // Set loading to false once image is loaded
            />
            {loading && <ActivityIndicator size="large" color="#8d6e63" style={styles.loadingIndicator} />}
            <View style={styles.prixContainer}>
              <Text style={styles.produitPrix}>{produit.prix} Dh</Text>
            </View>
            <View style={styles.regionContainer}>
              <Text style={styles.produitRegion}>{produit.regions}</Text>
              <Icones3 name="map-marker" size={24} color="#8d6e63" style={styles.iconemap} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ));
  };

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const Description = () => {
    settouteDescription(!touteDescription);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rechercher}>
        <TouchableOpacity style={styles.icon1} onPress={() => setMenuVisible(!menuVisible)}>
          <Icon name="menu-fold" size={24} color='#8d6e63' />
        </TouchableOpacity>
        <Text style={styles.text}> ArtiConnect </Text>
      </View>
      {menuVisible && (
        <View style={styles.menuVerticale}>
          <TouchableOpacity onPress={() => navigation.navigate('Inscrire')}>
            <Icon style={styles.menuIcon} name="adduser" size={24} color="#000000" />
            <Text>créer compte</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => editerclient()}>
              <Icones2 style={styles.menuIcon} name="user-edit" size={24} color="#000000" />
              <Text>modifier profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => voircommande()}>
            <Icon style={styles.menuIcon} name="shoppingcart" size={24} color="#000000" />
            <Text>mes commandes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Pagelogin')}>
            <Icones4 style={styles.menuIcon} name="log-out" size={24} color="#000000" />
            <Text>se déconnecter</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Choisir région"
          onChangeText={text => setRegion(text)}
          value={region}
        />
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Choisir catégorie" value="" />
            <Picker.Item label="Tapissier" value="tapissier" />
            <Picker.Item label="Poterie" value="poterie" />
            <Picker.Item label="Luminaire" value="luminaire" />
            <Picker.Item label="Bijouterie" value="bijouterie" />
          </Picker>
        </View>
      </View>
      <ScrollView
        style={styles.produitsContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {presentationproduit()}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Détails du produit</Text>
              <Image
                source={{ uri: `data:image/jpeg;base64,${selectedProduct?.imageBase64}` }}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <Text style={styles.title}>Description: </Text>
              <Text style={styles.information} onPress={Description}>
                {selectedProduct?.description && selectedProduct?.description.length > 30 && !touteDescription
                  ? selectedProduct?.description.slice(0, 40) + '...'
                  : selectedProduct?.description}
              </Text>
              <Text style={styles.informationprix}> <Text style={styles.title}>Prix: </Text>  {selectedProduct?.prix} Dh</Text>
              <Text style={styles.information}><Text style={styles.title}>Région: </Text>  {selectedProduct?.regions}</Text>
              <Text style={styles.information}><Text style={styles.title}>Fournisseur: </Text>  {selectedProduct?.nomfournisseur}</Text>
              <TouchableOpacity style={styles.modalbutton} onPress={commander} >
                <Text style={styles.modalbuttontext} >Commander</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8d6e63" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Fond blanc
    flex: 1,
  },
  rechercher: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Couleur fond clair pour la barre de recherche
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  text: {
    flex: 1,
    fontSize: 28,
    marginLeft: 80,
    fontWeight: 'bold',
    color: '#8d6e63', // Brun pour le texte du titre
  },
  icon1: {
    marginRight: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFAF1', // Couleur clair pour l'entrée de texte
    flex: 1,
    height: 40,
    borderColor:'#8d6e63',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flex: 1,
    borderColor:'#8d6e63',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFAF1', // Couleur clair pour le picker
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    color: '#333', // Brun pour le texte du picker
  },
  produitsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  ContainerPro: {
    backgroundColor: '#FFFFFF', // Nouvelle couleur de fond
    borderRadius: 10, // Bordure arrondie
    marginBottom: 20, // Marge en bas
    width: '100%',
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.25, // Opacité de l'ombre
    shadowRadius: 3.84, // Rayon de l'ombre
    elevation: 5,
  },
  row: {
    marginBottom: 20,
  },
  produitContainer: {
    width: '100%',
  },
  produitImage: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  prixContainer: {
    margin: 10,
  },
  regionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  produitPrix: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Rouge terre cuite pour le prix
  },
  produitRegion: {
    fontSize: 16,
    color: '#333', // Vert olive pour la région
    marginRight: 5,
  },
  iconemap: {
    marginLeft: 5,
  },
  menuVerticale: {
    position: 'absolute',
    top: 50,
    marginLeft: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', // Fond clair pour le menu vertical
    width: 120,
    height: '50%',
    paddingVertical: 20,
    borderRightWidth: 1,
    borderColor: '#8d6e63', // Bordure brune
    zIndex: 1,
  },
  menuIcon: {
    marginTop: 10,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: -20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8d6e63', // Brun pour le titre du modal
    marginRight: 70,
    marginTop: 10,
  },
  modalImage: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    marginTop: -10,
  },
  title: {
    fontWeight: 'bold',
    color: '#8d6e63', // Rouge terre cuite pour les titres d'information
    fontSize: 16,
  },
  information: {
    fontSize: 16,
    color: '#333', // Vert olive pour le texte d'information
    marginBottom: 20,
  },
  informationprix: {
    fontSize: 16,
    color: '#333', // Vert olive pour le texte d'information
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalbutton: {
    width: '50%',
    height: 40,
    backgroundColor: '#dcc7a7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 80,
  },
  modalbuttontext: {
    color: '#000000',
    fontSize: 16,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#8d6e63',
  },
});

export default PresentationProduit;
