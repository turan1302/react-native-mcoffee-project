import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { ScrollView, Text, View } from "react-native";
import { inject, observer } from "mobx-react";
import ProfileMenus from "../../components/Profile/ProfileMenus";
import styles from "./styles";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Logs from "../../components/Profile/Logs";

const Profile = (props) => {
  const { navigation, AuthStore } = props;
  const [appState, setAppState] = useState({});
  const [logs, setLogs] = useState([]);

  const doLogout = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Başarılı",
      textBody: "Çıkış işleminiz gerçekleştiriliyor. Lütfen bekleyiniz...",
      autoClose: 2000,
    });
    setTimeout(() => {
      AuthStore.removeToken();
    }, 2000);
  };

  useEffect(() => {
    let profileFocus = navigation.addListener("focus", () => {
      getProfilePage();
      setAppState(AuthStore.appState.user);
    });

    return () => {
      profileFocus?.remove;
    };

  }, []);

  const getProfilePage = async () => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.profile_page, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        setLogs(result.data.logs);
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
        <ScrollView bounces showsVerticalScrollIndicator={false}>
          <View style={styles.profile_info_area}>
            <View style={styles.account_name_area}>
              <Text style={styles.account_name_text}>{appState.c_name + " " + appState.c_surname}</Text>
            </View>

            <Logs logs={logs} />

            < ProfileMenus doLogout={doLogout} />
          </View>
        </ScrollView>
      </View>
    </AuthLayout>
  );
};

export default inject("AuthStore")(observer(Profile));
