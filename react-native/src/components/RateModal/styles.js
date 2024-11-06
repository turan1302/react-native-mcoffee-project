import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContent: (position)=>({
    flex: (position==="LANDSCAPE") ? 1 : 0.5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  }),
  closeButton: {
    position: "absolute",
    top: 0,
    right: 3,
  },

  container : {marginTop : 20},
  modal_title : {fontWeight : "bold",color : "#000",fontSize : 15},
  rate_area : {marginTop : 10},

  buttons_area : {marginTop : 50,flexDirection : "row",alignItems : "center",paddingHorizontal : 20},
  reset_button : {
    backgroundColor: "#ccc",
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  reset_button_text : { fontWeight: "bold", color: "#2f2f2f" },
  vote_button : {
    backgroundColor: "#ccc",
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  vote_button_text : { fontWeight: "bold", color: "#2f2f2f" }
});

export default styles;
