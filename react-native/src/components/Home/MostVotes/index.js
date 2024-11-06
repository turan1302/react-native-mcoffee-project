import React from "react";
import { FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import AppUrl from "../../../RestAPI/AppUrl";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ListItem from "./ListItem";
import EmptyComponent from "./EmptyComponent";

const MostVotes = (props) => {
  const { mostVotes, windowDimensions,setFavourite,addCart} = props;
  const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>En Çok Puanlanan Ürünler</Text>
      {(mostVotes.length === 0) ? (<EmptyComponent/>) : (
        <FlatList style={styles.flatlist_style} horizontal
                  showsHorizontalScrollIndicator={false} data={mostVotes}
                  keyExtractor={(item, index) => index+300}
                  bounces renderItem={({ item, index }) => (
          <ListItem addCart={addCart} setFavourite={setFavourite} item={item} windowDimensions={windowDimensions} position={position} />
        )} />
      )}
    </View>
  );
};

export default MostVotes;
