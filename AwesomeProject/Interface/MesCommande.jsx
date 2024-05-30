import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import Icones from 'react-native-vector-icons/Ionicons';
import Icone from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const MesCommandes = ({ route }) => {
    const { UserId } = route.params;
    const [loading, setLoading] = useState(true);
    const [commandes, setCommandes] = useState([]);
    const [avis, setAvis] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        fetch(`http://10.0.2.2:8082/api/demandes_client/${UserId}`)
            .then(response => response.json())
            .then(data => {
                setCommandes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de commande:', error);
                setLoading(false);
            });
    }, []);

    const fonctionavis = (commandeId, text) => {
        setAvis(prevState => ({
            ...prevState,
            [commandeId]: text
        }));
    };

    const DonnerAvis = (commande) => {
        fetch(`http://10.0.2.2:8082/api/DonnerAvis?idDemande=${commande.idDemande}&commentaire=${avis[commande.idDemande]}&idFournisseur=${commande.idFournisseur}`, {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                Alert.alert('Succès', 'Votre avis a été soumis.');
            } else {
                Alert.alert('Échec', 'Échec de la soumission de votre avis.');
            }
        })
        .catch(error => {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour du statut de la commande.');
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.rollback} onPress={() => navigation.navigate('PresentationProduit', { UserId: UserId })}>
                    <Icones name="chevron-back-outline" size={28} color='#8d6e63' />
                </TouchableOpacity>
                <Text style={styles.title}>Mes Commandes</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#ff6347" />
                ) : commandes.length === 0 ? (
                    <Text style={styles.noData}>Aucune commande disponible pour le moment.</Text>
                ) : (
                    commandes.map((commande, index) => (
                        <View key={index} style={styles.commandeContainer}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: `data:image/jpeg;base64,${commande.image}` }}
                                    style={styles.image}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                   <Text><Text style={styles.status}>Statut:</Text> <Text style={styles.boldText}>{commande.status}</Text></Text>
                                  <Text style={styles.info}>Prix total: <Text style={styles.boldText}>{commande.quantite * commande.prix}DH</Text></Text>
                                   <Text style={styles.info}>Quantité:{commande.quantite}</Text>
                                    <Text style={styles.info}>Fournisseur:{commande.nomFournisseur}</Text>
                                    {commande.status === 'termine' && (
                                     <View style={styles.reviewInputContainer}>
                                    <TextInput
                                      style={styles.reviewInput}
                                      value={avis[commande.idDemande] || ''}
                                       placeholder="Votre avis sera le bienvenu"
                                        multiline
                                        numberOfLines={3}
                                        onChangeText={(text) => fonctionavis(commande.idDemande, text)}
                                        />
                                        <TouchableOpacity
                                       style={styles.envoyer}
                                         onPress={() => DonnerAvis(commande)}
                                          >
                                          <Icone name="send-o" size={24} color="#8d6e63" />
                                            </TouchableOpacity>
                        </View>
                   )}
               </View>
                  </View>
 ))
  )}
           </ScrollView>
        </View>
      );
   };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFf',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8d6e63',
        flex: 1,
        textAlign: 'center',
    },
    rollback: {
      marginRight: 10,


    },
    scrollContainer: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    commandeContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        marginRight: 15,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    boldText: {
            fontWeight: 'bold',
            color: '#333',
        },
    status: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8d6e63',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        color: '#444',
    },
    noData: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    reviewInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    reviewInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginRight: 10,

    },

});

export default MesCommandes;
