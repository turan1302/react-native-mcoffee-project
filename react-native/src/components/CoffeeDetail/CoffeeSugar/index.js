import React from 'react'
import styles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import sugarData from "../../../config/sugarData";
const CoffeeSugar = (props) => {
  const {sugar,setSugar} = props;

  return (
    <View style={styles.coffee_sugar_container}>
      <View style={styles.coffee_sugar_area}>
        {sugarData.map((item, index) => (
          <TouchableOpacity onPress={() => {
            setSugar(item.status);
          }} key={index} style={styles.coffee_sugar_button(item, index, sugarData, sugar)}>
            <Text style={styles.coffee_sugar_button_text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default CoffeeSugar
