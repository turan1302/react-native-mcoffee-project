import React from 'react'
import { Text, View } from "react-native";
import styles from "./styles";

const ListItem = (props) => {
  const {item} = props;

  return (
    <View style={styles.item_container}>
      <View style={styles.item_top_area}>
        <Text style={styles.ord_no_text}>Sipariş Kodu: {item.ord_no}</Text>
        <Text style={styles.ord_price_text}>{item.bl_total_price} ₺ (KDV Dahil)</Text>
      </View>
      <View>
        <Text style={styles.payment_status_text}>Ödeme Durumu: {item.payment_status}</Text>
      </View>
      <View style={styles.item_list_area_container}>
        {item.products.map((item, index) => (
          <View key={index} style={styles.list_item_area}>
            <View>
              <Text style={styles.coffee_detail}>{item.cf_name} x {item.orp_qty} x {item.sugar_status}</Text>
            </View>
            <View>
              <Text style={styles.coffee_price}>{item.orp_total_price} ₺</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ListItem;
