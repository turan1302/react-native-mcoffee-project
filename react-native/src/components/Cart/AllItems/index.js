import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppUrl from "../../../RestAPI/AppUrl";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import * as NavigationService from "../../../NavigationService";

const AllItems = (props) => {
  const { item, position, windowDimensions, incrementItem, decrementItem } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>NavigationService.navigate("CoffeeDetail",{
        coffeeCode : item.c_coffee
      })} style={styles.left_area}>
        <Image style={styles.left_image(position,windowDimensions)} width={50} height={50} source={{ uri: AppUrl.storageURL + item.cf_image }} />
        <View style={styles.image_bottom_area}>
          <Text style={styles.item_name}>{item.cf_name}</Text>
          <View style={styles.item_desc_area}>
            <Text style={styles.item_size}>{item.c_size}</Text>
            <Text style={styles.item_price}>{item.c_price} ₺</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.right_area}>
        <TouchableOpacity onPress={() => decrementItem(item, 1)}>
          <AntDesign name={"minuscircleo"} color={"#000"} size={18} />
        </TouchableOpacity>
        <Text style={styles.cart_qty}>{item.c_qty}</Text>
        <TouchableOpacity onPress={() => incrementItem(item, 1)}>
          <AntDesign name={"pluscircleo"} color={"#000"} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllItems;
