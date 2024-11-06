import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { paddingVertical: 15 },

  add_basket_area : { flexDirection: "row", justifyContent: "space-between" },

  left_area : { flexDirection: "row" },
  price_text : { fontWeight: "bold", color: "#000", fontSize: 18 },
  qty_area : { flexDirection: "row", alignItems: "center", marginLeft: 20 },
  plus_qty : { marginHorizontal: 5, fontSize: 15 },

  total_area : { marginTop: 5 },
  total_price_text : {
    fontWeight: "400",
    color: "#000",
  },

  add_button_area : {
    backgroundColor: "#f26347",
    flex: 1,
    marginLeft: "30%",
    padding: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  add_button_text : { color: "#fff", fontWeight: "bold" }
});

export default styles;
