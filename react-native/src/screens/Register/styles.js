import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, paddingHorizontal: 20 },

  form_area : {
    backgroundColor: "#fff",
    marginTop: 100,
    marginBottom: 30,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  form_title : { color: "#000", fontWeight: "bold", fontSize: 20 },

  name_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  name_input : { flex: 1,color : "#000" },
  name_icon : {paddingHorizontal : 10},

  surname_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  surname_input : { flex: 1,color : "#000" },
  surname_icon : {paddingHorizontal : 10},

  email_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  email_input : { flex: 1,color : "#000"},
  email_icon : {paddingHorizontal : 10},

  password_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  password_input : { flex: 1,color : "#000" },
  password_icon : {paddingHorizontal : 10},

  password_confirm_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  password_confirm_input : { flex: 1,color : "#000" },
  password_confirm_icon : {paddingHorizontal : 10},

  register_button_area : {
    backgroundColor: "#f26347",
    marginTop: 30,
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 10,
  },
  register_button_text : { flex: 1, textAlign: "center", color: "#fff", fontWeight: "bold" },

  signin_text_area : { marginTop: 30 },
  signin_text : { fontWeight: "bold", color: "#000" },

  error_text : {color : "red",alignSelf : "flex-start"}
});

export default styles;
