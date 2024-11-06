import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#fff" },

  list_area : {paddingHorizontal : 10,marginVertical : 10},
  list_item : {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: "#ccc",
    elevation: 5,
    borderRadius: 7,
    marginBottom: 10,
    flexDirection : "row",
    alignItems : "center"
  },
  list_text : {marginLeft : 8,flex : 1,color : "#000",fontWeight : "bold"},

  app_version_text : {textAlign : "center",color : "#000"}
});

export default styles;
