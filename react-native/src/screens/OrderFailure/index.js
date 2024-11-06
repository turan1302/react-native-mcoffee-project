import React, { useEffect } from "react";
import { inject,observer } from "mobx-react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Text, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as NavigationService from "../../NavigationService";
import styles from "./styles";

const OrderFailure = (props) => {
  const {navigation} = props;


  const cartControl = async ()=>{
    const cart = await props.CartStore.cartData;
    if (cart.length<=0){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Sepet verisi bulunamadı",
        button: "Kapat",
        autoClose: 2000,
      });
    }

    NavigationService.reset();
  }

  return (
    <AuthLayout>
      <View style={styles.container}>
        <FontAwesome name={"times-circle"} color={"red"} size={200} />
        <View style={styles.text_area}>
          <Text style={styles.text_style}>Siparişiniz oluşturulurken hata oluştu.
            Lütfen daha sonra tekrar deneyiniz...</Text>
          <TouchableOpacity
            style={styles.button_style}
            onPress={() => {
              cartControl();
            }}>
            <Text style={styles.button_text}>Anasayfaya git</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  )
}

export default inject("AuthStore","CartStore")(observer(OrderFailure));
