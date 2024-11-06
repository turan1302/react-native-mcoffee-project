import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { paddingVertical: 10, borderWidth: 1, borderColor: "#ccc" },
  switch_area : {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    alignSelf: "center",
    padding: 5,
    marginHorizontal: 40,
    borderRadius: 10,
  },

  left_switch : (comeToYou)=>({
    backgroundColor: comeToYou ? "red" : "#ccc",
    padding: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  }),
  left_switch_text : (comeToYou)=>({ fontWeight: "bold", color: comeToYou ? "#fff" : "#000" }),

  right_switch : (comeToYou)=>({
    marginLeft: 20,
    backgroundColor: !comeToYou ? "red" : "#ccc",
    padding: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  }),
  right_switch_text : (comeToYou)=>({ fontWeight: "bold", color: !comeToYou ? "#fff" : "#000" }),

  come_to_you_area : { marginVertical: 10, paddingHorizontal: 10 },
  address_title : { color: "#000", fontWeight: "bold" },
  address_desc : { color: "#8a8a8a", marginTop: 5 },

  come_to_you_buttons_area : { marginTop: 10, flexDirection: "row" },
  change_address_button : {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#000",
    alignSelf: "flex-start",
    padding: 7,
    borderRadius: 10,
  },
  change_address_button_text : { marginLeft: 10, color: "#000" },

  order_note_button : {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#000",
    alignSelf: "flex-start",
    padding: 7,
    borderRadius: 10,
    marginLeft: 10,
  },
  order_note_button_text : { marginLeft: 10, color: "#000" },


  modal_container : (position)=>({
    flex: (position === "LANDSCAPE") ? 1 : 0.5,
    backgroundColor: "#fff",
    justifyContent: "center",
  }),
  modal_close_button : {
    position: "absolute",
    top: 0,
    right: 3,
  },

  note_area : { marginTop: 20 },
  note_area_title : { fontWeight: "bold", color: "#000", fontSize: 15, alignSelf: "center" },
  note_input_area : { marginTop: 10, marginHorizontal: 20 },
  note_input : { color: "#000", backgroundColor: "#efefef" },

  modal_bottom_buttons_area : { marginTop: 50, flexDirection: "row", alignItems: "center", paddingHorizontal: 20 },

  reset_button : {
    backgroundColor: "#ccc",
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  reset_button_text : { fontWeight: "bold", color: "#2f2f2f" },
  save_button : {
    backgroundColor: "#ccc",
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  save_button_text : { fontWeight: "bold", color: "#2f2f2f" }
});

export default styles;
