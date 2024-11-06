import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item_button: {
    marginEnd: 20,
    elevation: 5,
    marginVertical: 10,
    borderWidth: 0.8,
    borderColor: "#cdcdcd",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },

  item_image: (windowDimensions, position) => ({
    width: (position === "PORTRAIT") ? windowDimensions.width * 0.35 : windowDimensions.height * 0.35,
    height: (position === "PORTRAIT") ? windowDimensions.width * 0.25 : windowDimensions.height * 0.25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  }),

  item_image_buttons_area : {flexDirection : "row",justifyContent : "space-between",alignItems : "center"},
  item_image_left_buttons_area : {flexDirection : "row",alignItems : "center",justifyContent : "center",marginLeft : 5,marginTop : 5},
  item_rate_text : {marginLeft : 3,color : "white",fontWeight : "bold"},

  item_favourite_button: {marginRight: 5, marginTop: 5 },

  item_detail_area: (windowDimensions) => ({
    padding: 8,
    maxWidth: windowDimensions.width * 0.35
  }),

  item_name : { color: "#000", fontWeight: "bold" },

  item_bottom_detail_area : {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottom_left_detail_area : { flexDirection: "row" },
  bottom_left_item_size_text : { color: "#000", fontWeight: "bold" },
  bottom_left_item_price_text : { marginLeft: 5, color: "#000", fontWeight: "bold" },

  add_basket_button_area : {backgroundColor : "#f0f0f0",padding : 5}
});

export default styles;
