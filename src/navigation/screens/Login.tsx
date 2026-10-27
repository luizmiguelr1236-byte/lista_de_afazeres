import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export function Login() {
  const [user, setUser] = useState('');
  const [senha, setsenha] = useState('');
 

  function limpar() {
    setsenha('');
    setUser('');
  }

  function Logar() {

  }

 
  

  return (
        <View style={styles.container}>
            <Text>
              Usuario:
                <TextInput
                    style={[styles.input, { width: 280 }]}
                    onChangeText={setUser}
                    value={user}
                />
         
        
            senha:
                <TextInput
                    style={[styles.input, { width: 280, backgroundColor:"black"}]}
                    onChangeText={setsenha}
                    value={senha}
                />
            </Text>

          <View style={styles.fixToText}>
            <Button onPress={Logar} title="Enviar" color="#007AFF" /> 
            <Button onPress={limpar} title="Limpar" color="#841584" />
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#8f8b90',
    gap: 10,
    paddingTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  card: {
    width: "100%",
    margin: 20,
    color:"#2089dc",
  },
  cardText: {
    marginBottom: 5,
  }
});
