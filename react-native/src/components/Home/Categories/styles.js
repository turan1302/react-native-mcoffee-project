import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { marginTop: 15 },

  flatlist_design: { paddingLeft: 10 },
  button_style: (categories, index, selectedCategory, categoryCode) => ({
    padding: 10,
    marginEnd: (categories.length - 1 === index) ? 20 : 10,
    borderWidth: 1.2,
    borderColor: "#000",
    borderRadius: 20,
    backgroundColor: (selectedCategory === categoryCode) ? "#000" : "#fff",
  }),
  button_text: (selectedCategory, categoryCode) => ({
    color: (selectedCategory === categoryCode) ? "#fff" : "#000",
    fontWeight: "bold",
  }),
});

export default styles;
