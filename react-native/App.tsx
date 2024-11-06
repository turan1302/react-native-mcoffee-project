import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Routes from "./src/routes";
import { Provider } from "mobx-react";
import Store from "./src/store";
import { AlertNotificationRoot } from "react-native-alert-notification";

const App = (props) => {
  return (
    <AlertNotificationRoot>
      <Provider {...Store}>
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
      </Provider>
    </AlertNotificationRoot>
  );
};

export default App;
