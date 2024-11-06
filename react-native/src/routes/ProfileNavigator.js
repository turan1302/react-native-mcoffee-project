import React from 'react';

import Profile from "../screens/Profile";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountInfo from "../screens/Profile/AccountInfo";
import Faq from "../screens/Profile/Faq";
import AddressList from "../screens/Profile/Address/AddressList";
import CreateAddress from "../screens/Profile/Address/CreateAddress";
import EditAddress from "../screens/Profile/Address/EditAddress";
import Orders from "../screens/Orders";
import Settings from "../screens/Profile/Settings";
const Stack = createNativeStackNavigator();

const ProfileNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName={"Profile"} screenOptions={()=>{
      return {
        headerShown : false
      }
    }}>
      <Stack.Screen name={"Profile"} component={Profile}/>
      <Stack.Screen name={"AccountInfo"} component={AccountInfo}/>
      <Stack.Screen name={"CreateAddress"} component={CreateAddress}/>
      <Stack.Screen name={"EditAddress"} component={EditAddress}/>
      <Stack.Screen name={"Orders"} component={Orders}/>
      <Stack.Screen name={"Settings"} component={Settings}/>
      <Stack.Screen name={"Faq"} component={Faq}/>
    </Stack.Navigator>
  )
}

export default ProfileNavigator;
