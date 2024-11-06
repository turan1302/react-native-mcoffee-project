import React from 'react'
import Cart from "../screens/Cart";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderComplete from "../screens/OrderComplete";
import OrderFailure from "../screens/OrderFailure";
const Stack = createNativeStackNavigator();
const CartNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Cart"} screenOptions={()=>{
      return {
        headerShown : false
      }
    }}>
      <Stack.Screen name={"Cart"} component={Cart}/>
      <Stack.Screen name={"OrderComplete"} component={OrderComplete}/>
      <Stack.Screen name={"OrderFailure"} component={OrderFailure}/>
    </Stack.Navigator>
  )
}
export default CartNavigator;
