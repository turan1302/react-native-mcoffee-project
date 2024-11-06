import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/CoffeeDetail/CustomHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import Loader from "../../components/common/Loader";
import styles from "./styles";
import CoffeeDescription from "../../components/CoffeeDetail/CoffeeDescription";
import CoffeeSize from "../../components/CoffeeDetail/CoffeeSize";
import CoffeeSugar from "../../components/CoffeeDetail/CoffeeSugar";
import CoffeeBasket from "../../components/CoffeeDetail/CoffeeBasket";

import Modal from "react-native-modal";
import Stars from "react-native-stars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RateModal from "../../components/RateModal";


const CoffeeDetail = (props) => {
  const { route } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [coffee, setCoffee] = useState({});
  const [coffeeSize, setCoffeeSize] = useState([]);
  const [coffeeRate, setCoffeeRate] = useState(0);  // kahve değerlendirmesi (1 - 5)
  const [sugar, setSugar] = useState(0);

  const [changeCoffeeSize, setChangeCoffeeSize] = useState({});
  const [changeCoffeeQty, setChangeCoffeeQty] = useState(1);

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

  const [fullDescription, setFullDescription] = useState(false);

  const handleResize = () => {
    setWindowDimensions(Dimensions.get("window"));
  };

  useEffect(() => {
    getCoffee();

    const windowListener = Dimensions.addEventListener("change", handleResize);
    return () => {
      windowListener?.remove();
    };
  }, []);

  const getCoffee = async () => {
    setIsLoading(true);
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.get_coffee + `/${route.params.coffeeCode}`, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        setIsLoading(false);
        setCoffee(result.data.coffee);
        setCoffeeSize(result.data.coffee_size);

        setChangeCoffeeSize({
          cfp_default: 1,
          cfp_size: result.data.coffee.cfp_size,
          cfp_price: result.data.coffee.cfp_price,
        });

        setCoffeeRate(result.data.rate);
      }

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

  const setFavourite = () => {
    let newCoffee = { ...coffee, cf_favourite: !coffee.cf_favourite };
    setCoffee(newCoffee);

    setFavouriteAPI(coffee.cf_code);
  };

  const setCoffeeQty = (qty) => {
    let newQty = changeCoffeeQty + qty;
    if (newQty > 0 && newQty <= 10) {
      setChangeCoffeeQty(newQty);
    }
  };

  const setFavouriteAPI = async (coffeeCode) => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.set_favourite, {
      fv_coffee: coffeeCode,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
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

  const setRate = async () => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.set_coffee_rate + `/${route.params.coffeeCode}`, {
      rt_star: coffeeRate,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const status = res.status;
      const result = res.data;

      if (status === 404) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: result.title,
          textBody: result.message,
          button: "Kapat",
          autoClose: 2000,
        });
        props.AuthStore.removeToken();
      }

      setIsVisibleModal(false);
      getCoffee();
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

  const addCart = async ()=>{
    let data = {
      c_coffee : coffee.cf_code,
      c_sugar : sugar,
      c_size : changeCoffeeSize.cfp_size,
      c_qty : changeCoffeeQty,
      c_price : changeCoffeeSize.cfp_price
    };

    await props.CartStore.addToCart(data,changeCoffeeQty);
    await props.AuthStore.getAccessToken();

    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.set_cart, data, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const status = res.status;
      const result = res.data;

      if (status===201){
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose: 2000,
        });
      }else{
        if (status === 401 || status===500 || status===404) {
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

  return (
    <AuthLayout>
      <View style={styles.container}>
        <CustomHeader coffee={coffee} setFavourite={setFavourite} />
        {(isLoading) ? (<Loader />) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detail_area}>
              <Image style={styles.detail_image(windowDimensions, position)}
                     source={{ uri: AppUrl.storageURL + coffee.cf_image }} />

              <View style={styles.detail_name_area}>
                <Text style={styles.detail_name}>{coffee.cf_name}</Text>
                <TouchableOpacity onPress={() => setIsVisibleModal(true)} style={styles.detail_right_area}>
                  <FontAwesome name={"star"} color={"#f9d701"} size={20} />
                  <Text
                    style={styles.detail_rate_average}>{coffee.cf_rates}</Text>
                  <Text style={styles.detail_rate_count}>({coffee.rate_count})</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.description_container}>
                <CoffeeDescription setFullDescription={setFullDescription} fullDescription={fullDescription}
                                   coffee={coffee} />

                <CoffeeSize coffeeSize={coffeeSize} setChangeCoffeeSize={setChangeCoffeeSize}
                            changeCoffeeSize={changeCoffeeSize} />

                <CoffeeSugar sugar={sugar} setSugar={setSugar} />
              </View>

              <CoffeeBasket addCart={addCart} changeCoffeeSize={changeCoffeeSize} changeCoffeeQty={changeCoffeeQty}
                            setCoffeeQty={setCoffeeQty} />

            </View>
          </ScrollView>
        )}
      </View>


      <RateModal isVisibleModal={isVisibleModal} position={position} setIsVisibleModal={setIsVisibleModal}
                 coffeeRate={coffeeRate} setCoffeeRate={setCoffeeRate} setRate={setRate} />
    </AuthLayout>
  );
};

export default inject("AuthStore","CartStore")(observer(CoffeeDetail));
