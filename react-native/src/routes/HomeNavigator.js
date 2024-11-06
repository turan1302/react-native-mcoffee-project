import React from 'react'

import Home from "../screens/Home";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from "../screens/Search";
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
   <Stack.Navigator initialRouteName={"Home"} screenOptions={()=>{
     return {
       headerShown : false
     }
   }}>
     <Stack.Screen name={"Home"} component={Home}/>
     <Stack.Screen name={"Search"} component={Search}/>
   </Stack.Navigator>
  )
}

export default HomeNavigator
