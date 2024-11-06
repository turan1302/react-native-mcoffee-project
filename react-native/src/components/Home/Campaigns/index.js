import React from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import AppUrl from "../../../RestAPI/AppUrl";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ListItem from "./ListItem";
import EmptyComponent from "./EmptyComponent";

const Campaigns = (props) => {
  const { campaigns, windowDimensions,setFavourite,addCart } = props;
  const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kampanyalı Popüler Ürünler</Text>
      {(campaigns.length === 0) ? (
        <EmptyComponent />
      ) : (
        <FlatList
          style={styles.flatlist_style} horizontal
          showsHorizontalScrollIndicator={false} data={campaigns}
          keyExtractor={(item, index) => index+200}
          bounces renderItem={({ item, index }) => (
          <ListItem addCart={addCart} setFavourite={setFavourite} item={item} windowDimensions={windowDimensions} position={position} />
        )} />
      )}
    </View>
  );
};

export default Campaigns;
