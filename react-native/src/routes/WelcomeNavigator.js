import React, { useEffect, useState } from "react";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FavouriteNavigator from "./FavouriteNavigator";
import ProfileNavigator from "./ProfileNavigator";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { inject, observer } from "mobx-react";
import CartNavigator from "./CartNavigator";
import { autorun } from "mobx";

const Tab = createBottomTabNavigator();


const WelcomeNavigator = (props) => {
  const {cartData} = props.CartStore;
  const [cartCount, setCartCount] = useState(cartData.length);

  useEffect(() => {
    const updateCartCount = () => setCartCount(cartData.length);
    const disposer = autorun(updateCartCount); // MobX ile reaksiyon sağla

    return () => disposer(); // Temizleme
  }, [cartData]);

  return (
    <Tab.Navigator initialRouteName={"HomeNavigator"} screenOptions={({ route, navigation }) => {
      return {
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor : "#288000",
        tabBarInactiveTintColor : "#b2b2b2",
        tabBarLabelStyle : {
          fontWeight : "bold",
          fontSize : 12,
          marginBottom : 3
        },
        tabBarStyle: ((route) => {
          const tabBarHidden = ["CoffeeDetail","AccountInfo","Faq","Address","OrderComplete","OrderFailure","Orders","Settings","Search"];

          const routeName = getFocusedRouteNameFromRoute(route) ?? ""
          if (tabBarHidden.includes(routeName)) {
            return { display: "none" }
          }
        })(route)
      };
    }}>
      <Tab.Screen options={({ navigation, route }) => {
        return {
          title: "Anasayfa",
          tabBarIcon : ({focused})=>(
            <FontAwesome color={(focused) ? "#288000" : "#b2b2b2"} name={"home"} size={25}/>
          )
        };
      }} name={"HomeNavigator"} component={HomeNavigator} />

      <Tab.Screen options={({ navigation, route }) => {
        return {
          title: "Favoriler",
          tabBarIcon : ({focused})=>(
            <FontAwesome color={(focused) ? "#288000" : "#b2b2b2"} name={"heart"} size={20}/>
          )
        };
      }} name={"FavouriteNavigator"} component={FavouriteNavigator} />

      <Tab.Screen options={({ navigation, route }) => {
        return {
          title: "Sepet",
          tabBarBadge : cartCount === 0 ? null : cartCount,
          tabBarBadgeStyle : {
            height : 18,
          },
          tabBarIcon : ({focused})=>(
            <FontAwesome color={(focused) ? "#288000" : "#b2b2b2"} name={"shopping-cart"} size={20}/>
          )
        };
      }} name={"CartNavigator"} component={CartNavigator} />

      <Tab.Screen options={({ navigation, route }) => {
        return {
          title: "Profil",
          tabBarIcon : ({focused})=>(
            <FontAwesome6 color={(focused) ? "#288000" : "#b2b2b2"} name={"user-large"} size={20}/>
          )
        };
      }} name={"ProfileNavigator"} component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default inject("CartStore")(observer((WelcomeNavigator)));
