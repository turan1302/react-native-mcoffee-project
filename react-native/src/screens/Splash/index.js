import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { inject, observer } from "mobx-react";
import Fontisto from "react-native-vector-icons/Fontisto";

const Splash = (props) => {
  const { route, navigation, AuthStore } = props;


  useEffect(() => {

    const focusHandler = navigation.addListener("focus", isAuthenticated);

    return () => {
      focusHandler();
    };

  }, []);

  const isAuthenticated = () => {
    setTimeout(() => {
      AuthStore.getToken();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Fontisto name={"coffeescript"} size={50} color={"#000"} />
      <ActivityIndicator
        color={"#000"}
        size={30}
        style={styles.indicator_style}
      />
    </View>
  );
};

export default inject("AuthStore")(observer(Splash));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcff",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator_style: { marginTop: 50 },
});
