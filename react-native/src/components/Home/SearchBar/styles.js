import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    elevation: 5,
    borderRadius: 20,
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    marginHorizontal : 10,
    alignItems: "center",
    height: 40,
  },

  icon_style : { paddingRight: 5 },
  input_style : { flex: 1, height: 40, color: "black",justifyContent : "center",marginLeft : 5}
});

export default styles;
