import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { FlatList, Text, View } from "react-native";
import CustomHeader from "../../components/Profile/Orders/CustomHeader";
import EmptyComponent from "../../components/Profile/EmptyComponent";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import styles from "./styles";
import ListItem from "../../components/Profile/Orders/ListItem";

const Orders = (props) => {

  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();

    let focusListener = navigation.addListener("focus", () => {
      getOrders();
    });

    return () => {
      focusListener?.remove;
    };

  }, []);

  const getOrders = async () => {
    setIsLoading(false);
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.last_orders, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;


      if (status === 200) {
        setIsLoading(false);
        setOrders(result.data.orders);
      }

      if (status === 401 || status === 500) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: result.title,
          textBody: result.message,
          button: "Kapat",
          autoClose: 2000,
        });
        props.AuthStore.removeToken();
      }
    }).catch((err) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Sunucu bazlı bir hata oluştu. Lütfen daha sonra tekrar deneyiniz",
        button: "Kapat",
        autoClose: 2000,
      });
      props.AuthStore.removeToken();
    });
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <CustomHeader title={"Siparişlerim"} />
        <View style={styles.list_container_area}>
          <FlatList
            style={styles.flatlist_style}
            ListEmptyComponent={<EmptyComponent />}
            bounces showsVerticalScrollIndicator={false} data={orders} keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <ListItem item={item}/>
            )} />
        </View>
      </View>
    </AuthLayout>
  );
};

export default inject("AuthStore")(observer(Orders));
