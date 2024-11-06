import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as NavigationService from "../../../../NavigationService";
import styles from "./styles";

const CreateCustomHeader = (props) => {
  const { title,id,removeAddress } = props;

  const removeAddressDialog = ()=>{
    Alert.alert("Dikkat","Adres silinecektir. Onaylıyor musunuz",[
      {
        text : "Sil",
        onPress : ()=>removeAddress(id)
      },
      {
        text : "Vazgeç"
      }
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.content_area}>
        <TouchableOpacity onPress={()=>NavigationService.back()}>
          <Ionicons name={"arrow-back"} size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={removeAddressDialog}>
          <Ionicons name={"trash"} size={25} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateCustomHeader;
