import React from 'react';

import Favourites from "../screens/Favourites";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const FavouriteNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName={"Favourites"} screenOptions={()=>{
      return {
        headerShown : false
      }
    }}>
      <Stack.Screen name={"Favourites"} component={Favourites}/>
    </Stack.Navigator>
  )
}

export default FavouriteNavigator;
