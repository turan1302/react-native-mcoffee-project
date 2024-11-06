import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },

  form_area : {
    backgroundColor: "#fff",
    marginTop: 200,
    marginBottom: 30,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  form_title : { color: "#000", fontWeight: "bold", fontSize: 20 },

  email_area : {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  email_input : { flex: 1,color : "#000" },
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

  login_button_area : {
    backgroundColor: "#f26347",
    marginTop: 30,
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 10,
  },
  login_button_text : { flex: 1, textAlign: "center", color: "#fff", fontWeight: "bold" },

  signup_text_area : { marginTop: 30 },
  signup_text : { fontWeight: "bold", color: "black" },

  error_text : {color : "red",alignSelf : "flex-start"}

});

export default styles;
