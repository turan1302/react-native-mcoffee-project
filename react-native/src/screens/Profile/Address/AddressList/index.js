import React, { useEffect, useState } from "react";
import AuthLayout from "../../../../components/Layout/AuthLayout";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { inject, observer } from "mobx-react";
import ListCustomHeader from "../../../../components/Profile/Address/ListCustomHeader";
import EmptyComponent from "../../../../components/Profile/EmptyComponent";
import RestClient from "../../../../RestAPI/RestClient";
import AppUrl from "../../../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import Loader from "../../../../components/common/Loader";
import styles from "./styles";
import ListItem from "../../../../components/Profile/Address/ListItem";

const AdressList = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    let focusListener = navigation.addListener("focus", () => {
      getAddressDatas();
    });

    return () => {
      focusListener?.remove;
    };

  }, []);

  const getAddressDatas = async () => {
    setIsLoading(false);
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.address_list, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        setIsLoading(false);
        setAddress(result.data.address);
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

  const changeDefaultAddress = (id)=>{
    let newAddress = address.map((item,index)=>{
        return (item.add_id===id) ? {...item,add_default : 1} : {...item,add_default : 0}
    });

    setAddress(newAddress);
    setDefaultAddressAPI(id);
  }

  const setDefaultAddressAPI = async (id)=>{
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.address_default, {
      add_id: id
    }, {
      headers: {
        "Authorization": "Bearer " + token
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
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ListCustomHeader title={"Adreslerim"} />
        {(isLoading) ? (<Loader />) : (
          <View style={styles.container}>
            <FlatList
              ListEmptyComponent={<EmptyComponent />}
              bounces showsVerticalScrollIndicator={false} data={address} keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <ListItem item={item} changeDefaultAddress={changeDefaultAddress}/>
              )} />
          </View>
        )}
      </View>
    </AuthLayout>
  );
};

export default inject("AuthStore")(observer(AdressList));
