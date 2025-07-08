import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FormScreen from './src/screen/FormScreen';
import ShoppingListScreen from './src/screen/ShoppingListScreen';
import { TodoSreen1 } from './src/screen/TodoSreen1';
import ProductSpecification from './src/screen/ProductSpecification';
import AddedCart from './src/screen/AddedCart';
import { CartProvider } from './src/context/CartContext';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="ShoppingListScreen"
      component={ShoppingListScreen}
      options={{
        title: 'Shop',
        tabBarIcon: () => <Text style={{ fontSize: 18 }}>🛍️</Text>,
      }}
    />
    <Tab.Screen
      name="TodoSreen1"
      component={TodoSreen1}
      options={{
        title: 'Todo',
        tabBarIcon: () => <Text style={{ fontSize: 18 }}>📝</Text>,
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Form" component={FormScreen} />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ProductSpecification" component={ProductSpecification} />
          <Stack.Screen name="AddedCart" component={AddedCart} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
