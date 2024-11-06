import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#fff" },

  form_area : { paddingHorizontal: 10, marginTop: 10 },

  city_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  city_input : { flex: 1, color: "#000" },
  city_icon : { paddingHorizontal: 10 },

  district_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  district_input : { flex: 1, color: "#000" },
  district_icon : { paddingHorizontal: 10 },

  address_title_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  address_title_input : { flex: 1, color: "#000" },
  address_title_icon : { paddingHorizontal: 10 },

  address_text_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  address_text_input : { flex: 1, color: "#000" },

  tax_office_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical : 10
  },
  tax_office_input : { flex: 1, color: "#000" },

  tax_no_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  tax_no_input : { flex: 1, color: "#000" },

  save_button_area : {
    backgroundColor: "#4caf50",
    padding: 10,
    marginVertical: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  save_button_text : { fontWeight: "bold", color: "#fff", fontSize: 16 },

  error_text : { color: "red" }
});

export default styles;
