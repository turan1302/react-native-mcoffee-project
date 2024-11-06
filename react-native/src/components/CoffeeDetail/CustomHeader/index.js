import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import Octicons from "react-native-vector-icons/Octicons";

import * as NavigationService from "../../../NavigationService";

const CustomHeader = (props) => {
  const { coffee,setFavourite } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content_area}>
        <TouchableOpacity onPress={()=>NavigationService.back()}>
          <Octicons name={"arrow-left"} size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{coffee.cf_name}</Text>
        <TouchableOpacity onPress={()=>{
          setFavourite(coffee.cf_code);
        }}>
          <Ionicons name={"heart"} size={25} color={(coffee.cf_favourite) ? "red" : "#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
