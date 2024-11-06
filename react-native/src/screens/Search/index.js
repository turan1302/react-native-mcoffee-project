import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import CustomHeader from "../../components/Search/CustomHeader";
import EmptyComponent from "../../components/Search/EmptyComponent";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import AllItems from "../../components/Search/AllItems";

const Search = (props) => {

  const [key, setKey] = useState(""); // Arama için girilen anahtar
  const [debouncedKey, setDebouncedKey] = useState(key); // Debounced anahtar
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKey(key);
    }, 500);

    return () => clearTimeout(timer);
  }, [key]);

  useEffect(() => {
    if (debouncedKey!=="") {
      handleSearch();
    }else{
      setResultData([]);
    }
  }, [debouncedKey]);

  const handleSearch = () => {
    if (debouncedKey.trim()) {
      getFilterProduct();
    }
  };

  const getFilterProduct = async () => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.search, {
      key: debouncedKey,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {

      const result = res.data;
      const status = res.status;

      if (status === 200) {
        if (result.data && result.data.search && Array.isArray(result.data.search)) {
          setResultData(result.data.search); // search array'ini alıyoruz
        } else {
          console.log("Veri yapısı beklenmedik:", result.data);
        }
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
        <CustomHeader title={"Kahve Ara"} />
        <View style={styles.search_container}>
          <TextInput
            value={key}
            onChangeText={(text) => setKey(text)}
            style={styles.search_input}
            placeholderTextColor={"#5e5e5e"}
            placeholder={"Kahve Adı Giriniz..."}
          />
        </View>
        <FlatList
          ListEmptyComponent={<EmptyComponent />}
          data={resultData}
          keyExtractor={(item) => item.cf_id.toString()}
          style={{marginTop : 10}}
          showsVerticalScrollIndicator={false}
          renderItem={({ item,index }) => (
           <AllItems item={item}/>
          )}
        />
      </View>
    </AuthLayout>
  );
};

export default inject("AuthStore")(observer(Search));
