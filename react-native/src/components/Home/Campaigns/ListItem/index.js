import React from 'react'
import styles from "./styles";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AppUrl from "../../../../RestAPI/AppUrl";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as NavigationService from "../../../../NavigationService";

const ListItem = (props) => {
  const {item,windowDimensions,position,setFavourite,addCart} = props;

  return (
    <TouchableOpacity onPress={()=>NavigationService.navigate("CoffeeDetail",{
      coffeeCode : item.cf_code
    })} style={styles.item_button}>
      <ImageBackground
        style={styles.item_image(windowDimensions,position)}
        resizeMode={"cover"}
        source={{uri : AppUrl.storageURL+item.cf_image}}
      >
        <View style={styles.item_image_buttons_area}>
          <View style={styles.item_image_left_buttons_area}>
            <FontAwesome name={"star"} color={"#f9d701"} size={20}/>
            <Text style={styles.item_rate_text}>{item.cf_rates}</Text>
          </View>
          <TouchableOpacity onPress={()=>setFavourite(item.cf_code)} style={styles.item_favourite_button}>
            <AntDesign name={"heart"} color={(item.cf_favourite) ? "red" : "#fff"} size={20}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.item_detail_area(windowDimensions)}>
        <Text style={styles.item_name} numberOfLines={1}>{item.cf_name}</Text>
        <View style={styles.item_bottom_detail_area}>
          <View style={styles.bottom_left_detail_area}>
            <Text style={styles.bottom_left_item_size_text}>{item.cfp_size}</Text>
            <Text style={styles.bottom_left_item_price_text}>{item.cfp_price} ₺</Text>
          </View>
          <TouchableOpacity onPress={()=>addCart(item)} style={styles.add_basket_button_area}>
            <AntDesign name={"plus"} color={"#4c4c4c"} size={20}/>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem;
