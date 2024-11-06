import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {
    paddingHorizontal: 10,
    height: 60,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  content_area : { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title : { fontWeight: "bold", fontSize: 16, color: "#000",textAlign : "center"}
});

export default styles;
