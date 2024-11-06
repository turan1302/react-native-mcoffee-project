import React from 'react'
import { Text, View } from "react-native";
import styles from "./styles";

const Logs = (props) => {
  const {logs} = props;

  const formatDateToTurkish = (dateString) => {
    const correctedDateString = dateString.replace(/^20204/, '2024'); // Yılı düzelt

    const date = new Date(correctedDateString);
    if (isNaN(date)) {
      console.error("Geçersiz tarih değeri:", correctedDateString);
      return null;
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('tr-TR', options);
    return formatter.format(date);
  };

  return (
    <>
      {logs.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.container_title}>Son Aktiviteler</Text>

          <View style={styles.logs_area}>
            {logs.map((item, index) => (
              <View key={index} style={styles.logs_item_area}>
                <Text style={styles.item_title}>{item.lg_title}</Text>
                <Text style={styles.item_desc}>{formatDateToTurkish(item.lg_date)}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </>
  )
}

export default Logs
