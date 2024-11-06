import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item_container : {
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth : 0.8,
    padding : 10,
    borderRadius : 10,
    elevation : 5,
    backgroundColor : "#fff"
  },
  left_container_area : { flexDirection: "row", alignItems: "center", flex: 1},
  image : {width : 50,height : 50},

  description_area : {marginLeft : 10},
  description_title : {fontWeight : "bold",color : "#000"},
  description_price : { flex: 1,fontWeight : "bold",color : "#000" },

  rigt_count_area : { marginLeft: 10 },
  right_count_text : {fontWeight : "bold",color : "#000"}
});

export default styles;
