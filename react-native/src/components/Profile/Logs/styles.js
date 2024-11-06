import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 5,
    borderRadius: 10,
  },

  container_title : { color: "#4caf50", fontWeight: "bold", fontSize: 17 },

  logs_area : { marginVertical: 5 },
  logs_item_area : { justifyContent: "center", marginVertical: 5 },

  item_title : { color: "#000", fontWeight: "bold", fontSize: 16 },
  item_desc : { color: "#8c8c8c", fontWeight: "500" }
});

export default styles;
