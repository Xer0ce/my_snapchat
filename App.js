import React, { useState, createContext, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthContext = createContext();

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { registerId, registerPassword, login } = useContext(AuthContext);

  const handleLogin = () => {
    // Vérification des informations d'identification
    if (id === registerId && password === registerPassword) {
      // Connexion réussie
      console.log('Connexion réussie');
      // Utilisation de la fonction de connexion fournie par le contexte
      login();
      // Navigation vers la nouvelle page
      navigation.navigate('Home');
      // Réinitialiser les champs
      setId('');
      setPassword('');
    } else {
      // Identifiant ou mot de passe incorrect
      Alert.alert('Erreur', 'Identifiant ou mot de passe incorrect.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Connexion" onPress={handleLogin} />
      <Button title="S'inscrire" onPress={handleRegister} />
    </View>
  );
};

const RegisterPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { setRegisterId, setRegisterPassword } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleRegister = () => {
    // Vérification des informations d'inscription
    if (id && password) {
      // Inscription réussie
      setRegisterId(id);
      setRegisterPassword(password);
      console.log('Inscription réussie:', id, password);
      // Navigation vers la page de connexion
      navigation.navigate('Login');
      // Réinitialiser les champs
      setId('');
      setPassword('');
    } else {
      // Champs d'inscription vides
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="S'inscrire" onPress={handleRegister} />
    </View>
  );
};

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Félix, pas trop mal au cul ?</Text>
    </View>
  );
};

const AuthProvider = ({ children }) => {
const [registerId, setRegisterId] = useState('');
const [registerPassword, setRegisterPassword] = useState('');

const login = () => {
// Faites ici tout ce que vous souhaitez exécuter lors de la connexion réussie
console.log("Connexion réussie");
};

return (
<AuthContext.Provider value={{ registerId, registerPassword, login, setRegisterId, setRegisterPassword }}>
{children}
</AuthContext.Provider>
);
};

const App = () => {
return (
<NavigationContainer>
<AuthProvider>
<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={LoginPage} />
<Stack.Screen name="Register" component={RegisterPage} />
<Stack.Screen name="Home" component={HomePage} />
</Stack.Navigator>
</AuthProvider>
</NavigationContainer>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
padding: 16,
},
input: {
width: '100%',
height: 40,
borderColor: 'gray',
borderWidth: 1,
marginBottom: 12,
paddingHorizontal: 8,
},
text: {
fontSize: 24,
fontWeight: 'bold',
},
});

export default App;