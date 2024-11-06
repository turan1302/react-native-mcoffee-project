import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Splash from "../screens/Splash";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { navigationRef } from "../../src/NavigationService";
import WelcomeNavigator from "./WelcomeNavigator";
import CoffeeDetail from "../screens/CoffeeDetail";
import AddressList from "../screens/Profile/Address/AddressList";

const Routes = ()=>{
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={({navigation})=>{
        return {
          headerShown : false
        }
      }} initialRouteName={"Splash"}>
        <Stack.Screen name={"Welcome"} component={WelcomeNavigator}/>
        <Stack.Screen name={"CoffeeDetail"} component={CoffeeDetail}/>
        <Stack.Screen name={"Splash"} component={Splash}/>
        <Stack.Screen name={"Login"} component={Login}/>
        <Stack.Screen name={"Register"} component={Register}/>
        <Stack.Screen name={"AddressList"} component={AddressList}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;
