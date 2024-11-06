import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left_area : { flexDirection: "row", alignItems: "center", flex: 1 },
  left_image : (position,windowDimensions)=>({
    borderRadius: 5,
    height: (position === "PORTRAIT") ? windowDimensions.width * 0.15 : windowDimensions.height * 0.15,
    width: (position === "PORTRAIT") ? windowDimensions.width * 0.15 : windowDimensions.height * 0.15,
  }),

  image_bottom_area : { marginLeft: 10, flex: 1 },
  item_name : { color: "#000", fontWeight: "bold" },

  item_desc_area : { marginTop: 5, flexDirection: "row", alignItems: "center" },
  item_size : { color: "#a8a8a8", fontWeight: "bold" },
  item_price : { color: "#000", fontWeight: "bold", marginLeft: 8 },

  right_area : { flexDirection: "row", alignItems: "center", marginLeft: 20 },
  cart_qty : { marginHorizontal: 5, fontSize: 15 }
});

export default styles;
