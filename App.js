import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, TextInput, Pressable} from 'react-native';
import axios from 'axios';

export default function App() {
  const [name, setName] = React.useState('shaun');
  const [age, setAge] = React.useState('30');
  const [stockPrice, setStockPrice] = React.useState('0');
  const [availableFunds, setAvailableFunds] = React.useState(1000);

  const getStockFromApiAsync = async (nameIn) => {
    const stockUrl = 'https://realstonks.p.rapidapi.com/' + nameIn;
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

  const buyStock = (stockSymbol, stockPrice) => {
    setAvailableFunds(availableFunds - stockPrice);
  }

  const sellStock = (stockSymbol, stockPrice) => {
    setAvailableFunds(availableFunds + stockPrice);
  }

  const HomeScreen = ({navigation}) => {
    return (
      <View>
        <Text>Available Funds: {availableFunds}</Text>
        <Button
          title="View AAPL Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'AAPL'})
          }
        />
        <Button
          title="View TSLA Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'TSLA'})
          }
        />
        <Button
          title="View NFLX Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'NFLX'})
          }
        />
        <Button
          title="View MU Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'MU'})
          }
        />
      </View>
    )
  }

  const StockScreen = ({navigation, route}) => {
    getStockFromApiAsync(route.params.stock);
    return (
      <View style={styles.container} name={route.params.stock}>
        <Text>Available Funds: {availableFunds}</Text>
        <View style={styles.buySellRow}>
          <Text>{stockPrice}</Text>
          <Pressable
            style={styles.button}
            onPress={() => buyStock(route.params.stock, stockPrice)}
          >
            <Text>Buy</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => sellStock(route.params.stock, stockPrice)}
          >
            <Text>Sell</Text>
          </Pressable>
        </View>
        <Pressable
          title='Refresh'
          onPress={() => getStockFromApiAsync(route.params.stock)}
          style={styles.refreshButton}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'StockSim'}}
        />
        <Stack.Screen 
          name="Stock"
          component={StockScreen} 
          options={({ route }) => ({ 
            title: route.params.stock,
            headerTitle: "hello",
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buySellRow: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: '10%',
    margin: 20,
    padding: 20,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  button: {
    height: 50,
    margin: 20,
    padding: 20,
    backgroundColor: 'limegreen',
    borderRadius: '25%',
    alignItems: 'center',
  },
  refreshButton: {
    maxHeight: '10%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: '25%',
  },
  refreshButtonText: {
    color: 'white',
  }
});
