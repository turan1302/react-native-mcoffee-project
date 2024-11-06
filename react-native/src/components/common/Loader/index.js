import React from 'react'
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";

const Loader = (props) => {
  return (
      <View style={styles.container}>
        <ActivityIndicator size={30} color={"#f26347"} />
      </View>
  )
}

export default Loader
