import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const CustomHeader = (props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content_area}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>
          <Ionicons name={"filter"} size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
