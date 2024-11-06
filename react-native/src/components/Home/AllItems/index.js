import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AppUrl from "../../../RestAPI/AppUrl";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

import * as NavigationService from "../../../NavigationService";

const AllItems = (props) => {
  const { item, windowDimensions, position,setFavourite,addCart} = props;

  return (
    <TouchableOpacity onPress={()=>NavigationService.navigate("CoffeeDetail",{
      coffeeCode : item.cf_code
    })} style={styles.container}>
      <ImageBackground
        style={styles.image_area(windowDimensions, position)}
        imageStyle={styles.image_style}
        source={{ uri: AppUrl.storageURL + item.cf_image }}>
        <TouchableOpacity onPress={()=>setFavourite(item.cf_code)} style={styles.image_top_right_button_area}>
          <AntDesign name={"heart"} color={(item.cf_favourite) ? "red" : "#fff"} size={20} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.image_top_detail_area}>
        <Text style={styles.image_top_detail_left}>{item.cf_name} </Text>
        <View style={styles.image_top_detail_right}>
          <FontAwesome name={"star"} color={"#f9d701"} size={20} />
          <Text style={styles.image_top_detail_rigth_text}>{item.cf_rates}</Text>
        </View>
      </View>
      <View style={styles.image_bottom_detail_area}>
        <View style={styles.image_bottom_detail_left_area}>
          <Text style={styles.image_bottom_detail_size_text}>{item.cfp_size}</Text>
          <Text style={styles.image_bottom_detail_price_text}>{item.cfp_price} ₺</Text>
        </View>
        <TouchableOpacity onPress={()=>addCart(item)} style={styles.image_bottom_detail_add_basket}>
          <AntDesign name={"plus"} color={"#4c4c4c"} size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AllItems;
