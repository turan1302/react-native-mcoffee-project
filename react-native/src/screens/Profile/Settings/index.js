import React, { useEffect, useState } from "react";
import { inject,observer } from "mobx-react";
import AuthLayout from "../../../components/Layout/AuthLayout";
import {ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../../components/Profile/CustomHeader";
import CheckBox from '@react-native-community/checkbox';
import styles from "./styles";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import VersionNumber from 'react-native-version-number';

const Settings = (props) => {
  const {navigation} = props;

  const [notifyCheck, setNotifyCheck] = useState(0);
  const [emailCheck, setEmailCheck] = useState(0);
  const [smsCheck, setSmsCheck] = useState(0);

  useEffect(() => {

    let focusListener = navigation.addListener("focus", () => {
      getClientSettingsDatas();
    });

    return () => {
      focusListener?.remove;
    };
  }, []);


  const getClientSettingsDatas = async () => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.client_settings, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;


      if (status === 200) {
        setNotifyCheck(result.data.cs_notify ? true : false);
        setEmailCheck(result.data.cs_email ? true : false);
        setSmsCheck(result.data.cs_sms ? true : false);
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

  const changeSettings = async (settings,setSettings,settingName)=>{
    setSettings(!settings);

    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.change_client_settings, {
      settingName,
      value :  !settings===true ? 1 : 0
    }, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res)=>{
      const status = res.status;
      const result = res.data;

      if (status === 401 || status === 500 || status === 404 || status === 422) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: result.title,
          textBody: result.message,
          button: "Kapat",
          autoClose: 2000,
        });
        setSubmitting(false);
      }

    }).catch((err) => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Sunucu bazlı bir hata oluştu. Lütfen daha sonra tekrar deneyiniz",
        button: "Kapat",
        autoClose: 2000
      });
      props.AuthStore.removeToken();
    });
  }

  return (
   <AuthLayout>
     <View style={styles.container}>
       <CustomHeader title={"Ayarlar"}/>
       <ScrollView bounces showsVerticalScrollIndicator={false}>
         <View style={styles.list_area}>
          <TouchableOpacity onPress={()=>changeSettings(notifyCheck,setNotifyCheck,"cs_notify")} style={styles.list_item}>
            <CheckBox
              disabled={false}
              value={notifyCheck}
            />

            <Text style={styles.list_text}>Anlık bildirim al</Text>
          </TouchableOpacity>

           <TouchableOpacity onPress={()=>changeSettings(emailCheck,setEmailCheck,"cs_email")} style={styles.list_item}>
             <CheckBox
               disabled={false}
               value={emailCheck}
             />
             <Text style={styles.list_text}>Kampanyalar ile ilgili E-Posta al</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>changeSettings(smsCheck,setSmsCheck,"cs_sms")} style={styles.list_item}>
             <CheckBox
               disabled={false}
               value={smsCheck}
             />

             <Text style={styles.list_text}>Kampanyalar ile ilgili SMS al</Text>
           </TouchableOpacity>

           <Text style={styles.app_version_text}>
             Uygulama Versionu: {VersionNumber.appVersion}
           </Text>
         </View>
       </ScrollView>
     </View>
   </AuthLayout>
  )
}

export default inject("AuthStore")(observer(Settings));
