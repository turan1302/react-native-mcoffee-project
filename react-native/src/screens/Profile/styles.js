import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, padding: 8, backgroundColor: "#fcfcff" },

  profile_info_area : { paddingHorizontal: 2 },
  account_name_area : {
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  account_name_text : {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  }
});

export default styles;
