import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as NavigationService from "../../../NavigationService";
import styles from "./styles";

const CustomHeader = (props) => {
  const { title, removeCartAlert, cart } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content_area}>
        <TouchableOpacity onPress={() => NavigationService.back()}>
          <Ionicons name={"arrow-back"} size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        {cart?.length > 0 ? (
          <TouchableOpacity onPress={removeCartAlert}>
            <Ionicons name={"trash"} size={25} color="#ff2b2b" />
          </TouchableOpacity>
        ) : (<Text/>)}
      </View>
    </View>
  );
};

export default CustomHeader;
