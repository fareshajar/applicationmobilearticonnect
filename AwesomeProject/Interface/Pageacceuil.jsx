import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: '100%',
  },
});

const Pageacceuil = () => {
  const navigation = useNavigation();

  const naviguer = () => {
    navigation.navigate('Pagelogin');
  };

  return (
    <View style={styles.container}>
      {/* Enveloppez votre image dans un TouchableOpacity */}
      <TouchableOpacity onPress={naviguer}>
        <Image source={require('./carte2.jpg')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default Pageacceuil ;
