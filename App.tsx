import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoScreen from './src/screen/TodoScreen';
import FormScreen from './src/screen/FormScreen';
import { TodoSreen1 } from './src/screen/TodoSreen1';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
       <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="TodoSreen1" component={TodoSreen1} />
        <Stack.Screen name="Todo" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
