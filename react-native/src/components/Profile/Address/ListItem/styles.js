import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item_area_button : {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#000",
    backgroundColor: "#fff",
    elevation: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },

  item_left_container : { flex: 1 },
  item_left_title_area : { flexDirection: "row" },
  item_left_area_title : { color: "#000", fontWeight: "bold" },
  item_verified_icon : { marginLeft: 5 },

  item_left_desc : { marginTop: 10, color: "#000" },
});

export default styles;
