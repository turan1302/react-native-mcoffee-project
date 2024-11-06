import React from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./styles";

import * as NavigationService from "../../../../NavigationService";

const ListItem = (props) => {
  const {item,changeDefaultAddress} = props;

  return (
    <TouchableOpacity onLongPress={()=>changeDefaultAddress(item.add_id)} style={styles.item_area_button}>
      <View style={styles.item_left_container}>
        <View style={styles.item_left_title_area}>
          <Text style={styles.item_left_area_title}>{item.add_title}</Text>
          {(item.add_default === 1) && (
            <MaterialIcons name={"verified"} size={20} color={"#000"} style={styles.item_verified_icon} />)}
        </View>
        <Text style={styles.item_left_desc}>{item.add_desc}</Text>
      </View>
      <TouchableOpacity onPress={()=>NavigationService.navigate("EditAddress",{
        add_id : item.add_id
      })}>
        <Entypo name={"edit"} size={20} color={"#000"} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ListItem
