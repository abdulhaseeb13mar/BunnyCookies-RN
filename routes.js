import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavPointer from './Navigation/NavPointer';
import MainScreen from './Views/MainScreen';
import SinglePrd from './Views/singlePrd';
import Search from './Views/Search';
import InfoScreen from './Views/InfoScreen';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        NavPointer.InitializeNavPointer(ref);
      }}>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SinglePrd" component={SinglePrd} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
