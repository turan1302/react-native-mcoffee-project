import React, { useEffect, useState } from "react";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { FlatList, Text, View } from "react-native";

import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import CustomHeader from "../../../components/Profile/CustomHeader";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { inject, observer } from "mobx-react";
import Loader from "../../../components/common/Loader";
import EmptyComponent from "../../../components/Profile/EmptyComponent";
import ListItem from "../../../components/Profile/Faq/ListItem";
import styles from "./styles";

const Faq = (props) => {
  const { navigation } = props;

  const [sss, setSss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let focusListener = navigation.addListener("focus", () => {
      getSssDatas();
    });

    return () => {
      focusListener?.remove;
    };
  }, []);

  const getSssDatas = async () => {
    setIsLoading(false);
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.sss, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        setIsLoading(false);
        setSss(result.data.sss);
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
        <CustomHeader title={"S.S.S."} />
        {(isLoading) ? (<Loader />) : (
          <FlatList bounces showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyComponent />}
                    style={styles.flatlist} data={sss}
                    keyExtractor={(item, index) => index} renderItem={({ item, index }) => (
            <ListItem item={item} />
          )}>
          </FlatList>
        )}
      </View>
    </AuthLayout>

  );
};

export default inject("AuthStore")(observer(Faq));
