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
        'X-RapidAPI-Key': '<YOUR_API_KEY>',
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


  const DashboardScreen = ({navigation}) => {
    return (
      <View className="bg-slate-900 h-full">
        <Text className="text-sky-500 text-3xl text-center m-5">Available Funds: {availableFunds}</Text>
        <Pressable
          className="text-center bg-sky-500 p-5 my-2 mx-5 rounded-lg"
          title="View AAPL Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'AAPL'})
          }
          >
          <Text className="text-lg text-center">AAPL</Text>
        </Pressable>
        <Pressable
          className="align-middle bg-sky-500 p-5 my-2 mx-5 rounded-lg"
          title="View TSLA Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'TSLA'})
          }
          >
          <Text className="text-lg text-center">TSLA</Text>
        </Pressable>
        <Pressable
          className="text-center bg-sky-500 p-5 my-2 mx-5 rounded-lg"
          title="View NFLX Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'NFLX'})
          }
        >
          <Text className="text-lg text-center">NFLX</Text>
        </Pressable>
        <Pressable
          className="text-center bg-sky-500 p-5 my-2 mx-5 rounded-lg"
          title="View MU Stock"
          onPress={() => 
            navigation.navigate('Stock', {stock: 'MU'})
          }
          >
          <Text className="text-lg text-center">MU</Text>
        </Pressable>
      </View>
    )
  }

  const StockScreen = ({navigation, route}) => {
    getStockFromApiAsync(route.params.stock);
    return (
      <View 
        name={route.params.stock}
        className="bg-slate-900 h-full"
      >
        <Text className="text-sky-500 text-3xl text-center m-5">Available Funds: {availableFunds}</Text>
        <Text className="text-sky-300 text-xl text-center m-5">{stockPrice}</Text>

        <View className="flex-row justify-evenly mb-10">
           <Pressable
            className="text-center bg-sky-500 p-5 my-2 mx-5 rounded-lg"
            onPress={() => buyStock(route.params.stock, stockPrice)}
          >
            <Text className="text-black text-lg text-center">Buy</Text>
          </Pressable>
          <Pressable
            className="text-center bg-sky-500 p-5 my-2 mx-5 rounded-lg"
            onPress={() => sellStock(route.params.stock, stockPrice)}
          >
            <Text className="text-black text-lg text-center">Sell</Text>
          </Pressable>
        </View>
        <Pressable
          title='Refresh'
          onPress={() => getStockFromApiAsync(route.params.stock)}
        >
          <Text className="text-sky-500 text-lg text-center">Refresh</Text>
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
          name="Dashboard"
          component={DashboardScreen}
          options={{title: 'Dashboard'}}
        />
        <Stack.Screen 
          name="Stock"
          component={StockScreen} 
          options={({ route }) => ({ 
            headerTitle: route.params.stock,
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   buySellRow: {
//     flex: 1,
//     flexDirection: 'row',
//     maxHeight: '10%',
//     margin: 20,
//     padding: 20,
//     backgroundColor: 'grey',
//     alignItems: 'center',
//   },
//   button: {
//     height: 50,
//     margin: 20,
//     padding: 20,
//     backgroundColor: 'limegreen',
//     borderRadius: '25%',
//     alignItems: 'center',
//   },
//   refreshButton: {
//     maxHeight: '10%',
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: '25%',
//   },
//   refreshButtonText: {
//     color: 'white',
//   }
// });
