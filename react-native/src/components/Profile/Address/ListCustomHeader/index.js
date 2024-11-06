import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as NavigationService from "../../../../NavigationService";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

const ListCustomHeader = (props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content_area}>
        <TouchableOpacity onPress={()=>NavigationService.back()}>
          <Ionicons name={"arrow-back"} size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={()=>NavigationService.navigate("CreateAddress")}>
          <AntDesign name={"plus"} size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListCustomHeader;
