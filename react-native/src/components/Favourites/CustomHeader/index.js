import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import * as NavigationService from "../../../NavigationService";

const CustomHeader = (props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content_area}>
        <TouchableOpacity onPress={()=>NavigationService.back()}>
          <Ionicons name={"arrow-back"} size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text/>
      </View>
    </View>
  );
};

export default CustomHeader;
