import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('shaun');
  const [age, setAge] = useState('30');
  const [stockPrice, setStockPrice] = useState('0');
  const [stockName, setStockName] = useState('');

  const getStockFromApiAsync = async (nameIn) => {
    const stockUrl = 'https://realstonks.p.rapidapi.com/' + stockName;
    console.log(stockUrl);
    const options = {
      method: 'GET',
      url: stockUrl,
      headers: {
        'X-RapidAPI-Key': 'YOUR-API-KEY',
        'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setStockPrice(response.data.price);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter stock to find:</Text>
      <TextInput 
        multiline
        style={styles.input}
        placeholder='e.g. TSLA'
        onChangeText={newStockName => setStockName(newStockName)}
        />
      <Button 
        style={styles.button}
        onPress={() => getStockFromApiAsync()}
      />
      <Text>Stock Price for {stockName}: {stockPrice}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 100,
    height: 40,
  },
  button: {
  },
});
