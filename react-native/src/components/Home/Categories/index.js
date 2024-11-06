import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const Categories = (props) => {
  const { categories,selectedCategory,setSelectedCategory } = props;

  const changeCategory = (categoryCode)=>{
    if (selectedCategory===categoryCode){
      setSelectedCategory("");
    }else{
      setSelectedCategory(categoryCode);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.flatlist_design} bounces showsHorizontalScrollIndicator={false} horizontal
                data={categories} keyExtractor={(item, index) => index+100} renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={()=>changeCategory(item.cfc_code)}
          style={styles.button_style(categories,index,selectedCategory,item.cfc_code)}>
          <Text style={styles.button_text(selectedCategory, item.cfc_code)}>{item.cfc_name}</Text>
        </TouchableOpacity>
      )} />
    </View>
  );
};

export default Categories;
