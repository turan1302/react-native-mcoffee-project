import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  summary_area : { paddingHorizontal: 10 },
  summary_title : { fontWeight: "bold", color: "#000", fontSize: 15 },
  summary_container : { marginTop: 10, paddingBottom: 10 },

  cart_total_area : { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cart_total_text : { color: "#000" },
  cart_total_price_text : { color: "#000" },

  courier_area : {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  courier_text : { color: "#000" },
  courier_price : { color: "#000" },

  total_price_area : {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    padding: 10,
  },
  total_price_container : { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  total_price_text : { fontWeight: "bold", color: "#000", fontSize: 15 },
  total_price : {
    fontWeight: "bold",
    color: "#000",
    fontSize: 15,
  },

  order_complete_button_area : { marginTop: 20, marginHorizontal: 10, flexDirection: "row",marginBottom : 80},
  order_complete_button : {
    flex: 1,
    backgroundColor: "#e15a07",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  order_complete_button_text : { color: "#fff", fontWeight: "bold" }
});

export default styles;
