import React from 'react'
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppUrl from "../../../RestAPI/AppUrl";
import * as NavigationService from "../../../NavigationService";
import styles from "./styles";

const AllItems = (props) => {
  const {item} = props;

  return (
    <TouchableOpacity
      onPress={()=>NavigationService.navigate("CoffeeDetail",{
        coffeeCode : item.cf_code
      })}
      style={styles.item_container}>
      <View style={styles.left_container_area}>
        <Image style={styles.image} source={{uri : AppUrl.storageURL+item.cf_image}}/>
        <View style={styles.description_area}>
          <Text style={styles.description_title}>{item.cf_name}</Text>
          <Text style={styles.description_price}>{item.cfp_price} ₺</Text>
        </View>
      </View>
      <View style={styles.rigt_count_area}>
        <Text style={styles.right_count_text}>{item.cf_rates} ⭐</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AllItems;
