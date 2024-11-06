import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  coffee_sugar_container : { paddingVertical: 10 },
  coffee_sugar_area : { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  coffee_sugar_button : (item,index,sugarData,sugar)=>({
    alignContent: "center",
    borderWidth: 1.1,
    borderColor: (item.status===sugar) ? "#f26347" : "#000",
    flex: 1,
    marginRight: (index!==sugarData.length-1) ? 10 : null,
    alignItems: "center",
    paddingVertical : 10,
    borderRadius : 10,
    backgroundColor : (item.status===sugar) ? "#d7d9d9" : "#fff",
  }),
  coffee_sugar_button_text : {fontWeight : "bold",color : "#000"}
});

export default styles;
