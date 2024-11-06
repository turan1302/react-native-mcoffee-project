import React, { useEffect, useMemo, useState } from "react";
import { inject, observer } from "mobx-react";
import { Alert, Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/Cart/CustomHeader";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import Loader from "../../components/common/Loader";
import EmptyComponent from "../../components/Cart/AllItems/EmptyComponent";
import AllItems from "../../components/Cart/AllItems";
import styles from "./styles";
import Summary from "../../components/Cart/Summary";

import ListHeaderComponent from "../../components/Cart/AllItems/ListHeaderComponent";


const Cart = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [courierPrice, setCourierPrice] = useState(0);
  const [kdv, setKdv] = useState(0);
  const [cart, setCart] = useState([]);

  const [comeToYou, setComeToYou] = useState(true);
  const [address, setAddress] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderNote, setOrderNote] = useState("");


  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

  const handleResize = () => {
    setWindowDimensions(Dimensions.get("window"));
  };

  useEffect(() => {
    let windowListener = Dimensions.addEventListener("change", handleResize);

    let focusListener = navigation.addListener("focus", () => {
      getCartDatas();
    });


    return () => {
      focusListener?.remove;
      windowListener?.remove;
    };
  }, []);

  const getCartDatas = async () => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.cart, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        setIsLoading(false);
        setCart(result.data.cart);
        setCourierPrice(result.data.courier_price);
        setKdv(result.data.kdv);
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


  const removeCartAlert = () => {
    Alert.alert("Dikkat", "Sepetiniz temizlenecektir. Onaylıyor musunuz ?", [
      {
        text: "Sil",
        onPress: () => removeCart(),
      },
      {
        text: "Vazgeç",
      },
    ]);
  };

  const decrementItem = async (item, qty) => {
    await props.CartStore.decrementCartData(item, qty);

    if (item.c_qty - qty <= 0) {
      let newItems = cart.filter(items => items.c_id !== item.c_id);
      setCart(newItems);
    } else {
      let newItems = cart.map((items) => {
        return (items.c_id === item.c_id) ? { ...items, c_qty: items.c_qty - 1 } : { ...items };
      });
      setCart(newItems);
    }

    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.decrement_qty, {
      c_id: item.c_id,
      c_qty: qty,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then(async (res) => {
      const result = res.data;
      const status = res.status;

      if (status === 401 || status === 500 || status === 404) {
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

  const incrementItem = async (item, qty) => {
    await props.CartStore.incrementCartData(item, qty);

    if (item.c_qty + qty <= 10) {
      let newItem = cart.map((items) => {
        return (items.c_id === item.c_id) ? { ...items, c_qty: items.c_qty + qty } : { ...items };
      });
      setCart(newItem);
    }

    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.increment_qty, {
      c_id: item.c_id,
      c_qty: qty,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then(async (res) => {
      const result = res.data;
      const status = res.status;

      if (status === 401 || status === 500 || status === 404) {
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

  const removeCart = async () => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.remove_cart, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then(async (res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
       // TODO: ileride işlem yaptırılabilir
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

  const orderComplete = async ()=>{
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;
    const url = (comeToYou) ? AppUrl.order_cometoyou : AppUrl.order_comeget;

    await RestClient.postRequest(url,{
      ord_note : orderNote
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res)=>{
      const result = res.data;
      const status = res.status;

      if (status===201){
        if (!comeToYou){
          navigation.navigate("OrderComplete");
        }else{
          // sana gelsin seçilmiş ise
          navigation.navigate("OrderComplete");
        }
      }else{
        if (status===500 || status===404 || status===429){
         navigation.navigate("OrderFailure");
        }else{
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button: "Kapat",
            autoClose: 2000,
          });
          props.AuthStore.removeToken();
        }
      }

    }).catch((err) => {
      console.log(err);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Sunucu bazlı bir hata oluştu. Lütfen daha sonra tekrar deneyiniz",
        button: "Kapat",
        autoClose: 2000,
      });
      props.AuthStore.removeToken();
    });
  }

  const cartListHeader = useMemo(() => {
    return (
      <ListHeaderComponent cart={cart} setComeToYou={setComeToYou} setOrderNote={setOrderNote} comeToYou={comeToYou}
                           address={address} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} orderNote={orderNote} position={position} />
    );
  }, [comeToYou, address, isModalVisible, orderNote, cart]);

  return (
    <View style={styles.container}>
      <CustomHeader cart={cart} removeCartAlert={removeCartAlert} title={"Sepetim"} />
      {isLoading ? <Loader /> : (
        <View>
          <FlatList
            ListHeaderComponent={cartListHeader}
            ListEmptyComponent={<EmptyComponent />}
            ListFooterComponent={() => (
              (cart.length > 0) && <Summary comeToYou={comeToYou} courierPrice={courierPrice} kdv={kdv} orderComplete={orderComplete} />
            )}
            showsVerticalScrollIndicator={false} bounces contentContainerStyle={styles.flatlist_content_container_style}
            data={cart}
            keyExtractor={(item, index) => index} renderItem={({ item, index }) => (
            <AllItems item={item} position={position} windowDimensions={windowDimensions}
                      incrementItem={incrementItem} decrementItem={decrementItem} />
          )} />

        </View>
      )}
    </View>
  );
};

export default inject("AuthStore", "CartStore")(observer(Cart));
