import React from 'react'
import styles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";

const CoffeeSize = (props) => {
  const {coffeeSize,setChangeCoffeeSize,changeCoffeeSize} = props;

  return (
    <View style={styles.coffee_size_container}>
      <View style={styles.coffee_size_area}>
        {coffeeSize.map((item, index) => (
          <TouchableOpacity onPress={() => {
            setChangeCoffeeSize({
              cfp_default: 1,
              cfp_size: item.cfp_size,
              cfp_price: item.cfp_price,
            });
          }} key={index} style={styles.coffee_size_button(item, index, coffeeSize, changeCoffeeSize)}>
            <Text style={styles.coffee_size_button_text}>{item.cfp_size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default CoffeeSize
