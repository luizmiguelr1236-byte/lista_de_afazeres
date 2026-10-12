import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export function Home() {
  const [text, setText] = useState('Digite tarefa');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [id, setID] = useState(0);
  const [dados, setDados] = useState([]);
  const [time, setTime] = useState(
    new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function limpar() {
    setText('Digite tarefa');
    setDia('');
    setMes('');
    setAno('');
  }

  function enviar() {
    const novoId = id + 1;
    setID(novoId);

    const novaTarefa = {
      id: novoId.toString(),
      texto: `${text} - prazo: ${dia}/${mes}/${ano} - Data de criação: ${time}`,
      status: 'Pendente',
    };

    setDados([...dados, novaTarefa]); 
    limpar();
  }

  function alternarStatus(id) {
    setDados(dados.map(t =>
      t.id === id ? { ...t, status: t.status === 'Pendente' ? 'Concluída' : 'Pendente' } : t
    ));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { width: 280 }]}
            onChangeText={setText}
            value={text}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Dia:</Text>
            <TextInput
              style={[styles.input, { width: 40 }]}
              maxLength={2}
              onChangeText={setDia}
              value={dia}
            />
            <Text>Mês:</Text>
            <TextInput
              style={[styles.input, { width: 40 }]}
              maxLength={2}
              onChangeText={setMes}
              value={mes}
            />
            <Text>Ano:</Text>
            <TextInput
              style={[styles.input, { width: 60 }]}
              maxLength={4}
              onChangeText={setAno}
              value={ano}
            />
          </View>

          <View style={styles.fixToText}>
            <Button onPress={enviar} title="Enviar" color="#007AFF" /> 
            <Button onPress={limpar} title="Limpar" color="#841584" />
          </View>

          <Text>Data de criação: {time}</Text>

          <FlatList
            data={dados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[
                styles.card, 
                { backgroundColor: item.status === 'Pendente' ? '#d95f5d' : '#90EE90', padding: 10, borderRadius: 5 }
              ]}>
                <Text style={styles.cardText}>{item.texto}</Text>
                <Text>Status: {item.status}</Text>
                <Text>--------------------------------------------------------------------------</Text>
                <Button 
                  onPress={() => setDados(dados.filter((t) => t.id !== item.id))} 
                  title="Excluir" 
                  color="#FF3B30" 
                />
                <Button 
                  onPress={() => alternarStatus(item.id)} 
                  title={item.status === 'Pendente' ? 'Concluir' : 'Reabrir'} 
                  color="#34C759" 
                />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
