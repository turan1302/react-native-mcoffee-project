import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

import * as NavigationService from "../../../NavigationService";

const ProfileMenus = (props) => {
  const {doLogout} = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>NavigationService.navigate("AccountInfo")} style={styles.button_container}>
        <Text style={styles.button_text}>Hesap Bilgileri</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>NavigationService.navigate("Orders")} style={styles.button_container}>
        <Text style={styles.button_text}>Siparişlerim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>NavigationService.navigate("AddressList")} style={styles.button_container}>
        <Text style={styles.button_text}>Adres Defteri</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>NavigationService.navigate("Faq")} style={styles.button_container}>
        <Text style={styles.button_text}>Sıkça Sorulan Sorular</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>NavigationService.navigate("Settings")} style={styles.button_container}>
        <Text style={styles.button_text}>Ayarlar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={doLogout} style={styles.button_container}>
        <Text style={styles.button_text}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMenus;
