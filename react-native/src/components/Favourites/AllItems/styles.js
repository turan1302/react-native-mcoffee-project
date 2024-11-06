import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10, marginBottom: 20, borderWidth: 0.8,
    borderColor: "#cdcdcd",
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    elevation: 5,
    padding: 8,
  },

  image_area: (windowDimensions,position) => ({
    height: (position === "PORTRAIT") ? windowDimensions.width * 0.30 : windowDimensions.height * 0.30
  }),
  image_style : { borderRadius: 10 },

  image_top_right_button_area : { marginRight: 6, marginTop: 6, alignSelf: "flex-end" },

  image_top_detail_area : {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  image_top_detail_left : {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    flex: 1,
  },
  image_top_detail_right : { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  image_top_detail_rigth_text : { marginLeft: 3, color: "#969696" },

  image_bottom_detail_area : {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image_bottom_detail_left_area : { flexDirection: "row" },
  image_bottom_detail_size_text : { color: "#000", fontWeight: "bold" },
  image_bottom_detail_price_text : {
    marginLeft: 10,
    color: "#000",
    fontWeight: "bold",
  },

  image_bottom_detail_add_basket : { backgroundColor: "#f0f0f0", padding: 5 }
});

export default styles;
