import React from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

const CoffeeBasket = (props) => {
  const {changeCoffeeSize,setCoffeeQty,changeCoffeeQty,addCart} = props;

  return (
    <View style={styles.container}>
      <View style={styles.add_basket_area}>
        <View>
          <View style={styles.left_area}>
            <Text
              style={styles.price_text}>{changeCoffeeSize.cfp_price} ₺</Text>
            <View style={styles.qty_area}>
              <TouchableOpacity onPress={() => setCoffeeQty(-1)}>
                <AntDesign name={"minuscircleo"} color={"#000"} size={18} />
              </TouchableOpacity>
              <Text style={styles.plus_qty}>{changeCoffeeQty}</Text>
              <TouchableOpacity onPress={() => setCoffeeQty(1)}>
                <AntDesign name={"pluscircleo"} color={"#000"} size={18} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.total_area}>
            <Text style={styles.total_price_text}>Toplam: {(changeCoffeeSize.cfp_price * changeCoffeeQty).toFixed(2)} ₺</Text>
          </View>
        </View>
        <TouchableOpacity onPress={addCart} style={styles.add_button_area}>
          <Text style={styles.add_button_text}>Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CoffeeBasket
