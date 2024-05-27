import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pageacceuil from './Interface/Pageacceuil';
import Pagelogin from './Interface/Pagelogin';
import Inscrire from './Interface/Inscrire';
import PresentationProduit from './Interface/PresentationProduit';
import PasserCommande from './Interface/PasserCommande';
import DemandeFournisseur from './Interface/DemandeFournisseur';
import MesCommande from './Interface/MesCommande';
import Interfacefournisseur from './Interface/Interfacefournisseur';
import VoirAvisClient from './Interface/VoirAvisClient';
import Ajouterproduit from './Interface/Ajouterproduit';
import Editerclient from './Interface/Editerclient';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pageacceuil" component={Pageacceuil} options={{ headerShown: false }} />
        <Stack.Screen name="Pagelogin" component={Pagelogin} options={{ headerShown: false }} />
         <Stack.Screen name="Inscrire" component={Inscrire}  options={{ headerShown: false }}/>
         <Stack.Screen name="PresentationProduit" component={PresentationProduit} options={{ headerShown: false }}/>
         <Stack.Screen name="PasserCommande" component={PasserCommande} options={{ headerShown: false }}/>
         <Stack.Screen name="DemandeFournisseur" component={DemandeFournisseur} options={{ headerShown: false }}/>
         <Stack.Screen name="MesCommande" component={MesCommande} options={{ headerShown: false }}/>
         <Stack.Screen name="Interfacefournisseur" component={Interfacefournisseur} options={{ headerShown: false }}/>
         <Stack.Screen name="VoirAvisClient" component={VoirAvisClient} options={{ headerShown: false }}/>
         <Stack.Screen name="Ajouterproduit" component={Ajouterproduit} options={{ headerShown: false }}/>
         <Stack.Screen name="Editerclient" component={Editerclient} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
