import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#fff" },

  form_area : { paddingHorizontal: 10, marginTop: 10 },

  name_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  name_input : { flex: 1, color: "#000" },
  name_icon : { paddingHorizontal: 10 },

  surname_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  surname_input : { flex: 1, color: "#000" },
  surname_icon : { paddingHorizontal: 10 },

  email_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  email_input : { flex: 1, color: "#000" },
  email_icon : { paddingHorizontal: 10 },


  password_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  password_input : { flex: 1, color: "#000" },
  password_icon : { paddingHorizontal: 10 },

  password_confirmation_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  password_confirmation_input : { flex: 1, color: "#000" },

  button_area : {
    backgroundColor: "#4caf50",
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  button_text : { fontWeight: "bold", color: "#fff", fontSize: 16 },

  error_text : { color: "red" }
});

export default styles;
