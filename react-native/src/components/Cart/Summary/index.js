import React from "react";
import { inject, observer } from "mobx-react";
import { Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../../NavigationService";

import styles from "./styles";

const Summary = (props) => {
  const { courierPrice, kdv, comeToYou, orderComplete } = props;

  const kdvPrice = (kdv)=>{
    return (props.CartStore.totalPrice * ((100 + kdv) / 100)).toFixed(2);
  }

  const kdvCourierPrice =(kdv,courier)=>{
    return (parseFloat(props.CartStore.totalPrice * ((100 + kdv) / 100))+parseFloat(courier)).toFixed(2);
  }

  return (
    <>
      <View style={styles.summary_area}>
        <Text style={styles.summary_title}>Sepet Özeti</Text>
        <View style={styles.summary_container}>
          <View style={styles.cart_total_area}>
            <Text style={styles.cart_total_text}>Sepet Ücreti</Text>
            <Text style={styles.cart_total_price_text}>{props.CartStore.totalPrice.toFixed(2)} ₺</Text>
          </View>
          <View style={styles.cart_total_area}>
            <Text style={styles.cart_total_text}>KDV</Text>
            <Text style={styles.cart_total_price_text}>{kdv} %</Text>
          </View>
          <View style={styles.cart_total_area}>
            <Text style={styles.cart_total_text}>Ara Toplam</Text>
            <Text
              style={styles.cart_total_price_text}>{kdvPrice(kdv)} ₺</Text>
          </View>
          {comeToYou && (
            <View
              style={styles.courier_area}>
              <Text style={styles.courier_text}>Kurye Ücreti</Text>
              <Text style={styles.courier_price}>{courierPrice} ₺</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.total_price_area}>
        <View style={styles.total_price_container}>
          <Text style={styles.total_price_text}>Toplam Ücret:</Text>
          {(comeToYou) ? (
            <Text
              style={styles.total_price}>{kdvCourierPrice(kdv,courierPrice)} ₺</Text>
          ) : (
            <Text style={styles.total_price}>{kdvPrice(kdv)} ₺</Text>
          )}
        </View>
      </View>
      <View style={styles.order_complete_button_area}>
        <TouchableOpacity onPress={() => orderComplete()} style={styles.order_complete_button}>
          <Text style={styles.order_complete_button_text}>Siparişi Tamamla:</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default inject("CartStore")(observer(Summary));
