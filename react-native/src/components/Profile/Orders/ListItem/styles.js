import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item_container : {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#000",
    backgroundColor: "#fff",
    elevation: 5,
    padding: 10,
    marginHorizontal: 10,
  },

  item_top_area : { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ord_no_text : { fontWeight: "bold", color: "#000" },
  ord_price_text : { fontWeight: "bold", color: "#000" },

  payment_status_text : { fontWeight: "500", color: "#000" },

  item_list_area_container : { marginTop: 10, borderTopWidth: 1, borderTopColor: "#ccc" },
  list_item_area: {flexDirection : "row",justifyContent : "space-between",marginTop : 10},

  coffee_detail : {color : "#6e6e6e"},
  coffee_price : {color : "#6e6e6e"}
});

export default styles;
