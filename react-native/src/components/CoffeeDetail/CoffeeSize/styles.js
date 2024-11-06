import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  coffee_size_container : { paddingVertical: 10 },
  coffee_size_area : { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  coffee_size_button : (item,index,coffeeSize,changeCoffeeSize)=>({
    alignContent: "center",
    borderWidth: 1.1,
    borderColor: (item.cfp_size===changeCoffeeSize.cfp_size) ? "#f26347" : "#000",
    flex: 1,
    marginRight: (index!==coffeeSize.length-1) ? 10 : null,
    alignItems: "center",
    paddingVertical : 10,
    borderRadius : 10,
    backgroundColor : (item.cfp_size===changeCoffeeSize.cfp_size) ? "#d7d9d9" : "#fff",
  }),
  coffee_size_button_text : {fontWeight : "bold",color : "#000"},
});

export default styles;
