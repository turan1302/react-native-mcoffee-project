import React from 'react'
import styles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";

const CoffeeDescription = (props) => {
  const {setFullDescription,fullDescription,coffee} = props;

  return (
    <View style={styles.description_area}>
      <Text style={styles.description_title}>Açıklama</Text>
      <Text numberOfLines={fullDescription ? undefined : 3}
            style={styles.description_text}>
        {coffee.cf_desc}
      </Text>
      <TouchableOpacity onPress={() => setFullDescription(!fullDescription)}
                        style={styles.description_more_button}>
        <Text
          style={styles.description_more_text}>{(!fullDescription) ? "Tümünü Göster" : "Tümünü Gizle"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CoffeeDescription
