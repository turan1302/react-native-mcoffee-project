import React from 'react'
import { Text, View } from "react-native";
import styles from "./styles";

const EmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Herhangi bir içerik bulunamadı</Text>
    </View>
  )
}

export default EmptyComponent;
