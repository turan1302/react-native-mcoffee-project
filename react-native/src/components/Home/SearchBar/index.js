import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import * as NavigationService from "../../../NavigationService";

const SearchBar = () => {
  return (
    <TouchableOpacity onPress={()=>NavigationService.navigate("Search")} style={styles.container}>
      <AntDesign name={"search1"} size={18} color={"#000"} style={styles.icon_style} />
      <View style={styles.input_style}>
        <Text style={{color :"#a5a5a5"}}>Sevdiğin Kahveyi Ara...</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;
