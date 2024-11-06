import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#fff" },

  search_container : { margin: 10, flexDirection: "row", alignItems: "center" },
  search_input : {
    flex: 1,
    backgroundColor: "#e1e1e1",
    color: "#000",
    paddingLeft: 15,
    height: 45,
    borderRadius: 15,
  }
});

export default styles;
