import { StyleSheet } from "react-native";
import sugarData from "../../config/sugarData";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#fff" },

  detail_area : { paddingHorizontal: 10 },
  detail_image : (windowDimensions,position)=>({
    width: "100%",
    height: (position === "PORTRAIT") ? windowDimensions.width * 0.60 : windowDimensions.height * 0.60,
    marginTop: 10,
    objectFit: "cover",
    borderRadius: 10,
  }),

  detail_name_area : {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  detail_name : { fontWeight: "bold", color: "#000", fontSize: 18 },

  detail_right_area : { flexDirection: "row", alignItems: "center" },
  detail_rate_average : { marginLeft: 3, color: "#000", fontWeight: "bold", fontSize: 17 },
  detail_rate_count : { marginLeft: 8, color: "#000", fontWeight: "bold", fontSize: 13 },

  description_container : {paddingBottom : 15,borderBottomWidth : 1,borderBottomColor : "#e1e1e1"},


});

export default styles;
