import React, { useEffect, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { Dimensions, FlatList, Text, View } from "react-native";
import styles from "./styles";
import { inject, observer } from "mobx-react";
import CustomHeader from "../../components/Favourites/CustomHeader";
import EmptyComponent from "../../components/Favourites/AllItems/EmptyComponent";
import AllItems from "../../components/Favourites/AllItems";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import Loader from "../../components/common/Loader";
import sugarData from "../../config/sugarData";

const Favourites = (props) => {
  const { navigation } = props;

  const [favouriteData, setFavouriteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

  const handleResize = () => {
    setWindowDimensions(Dimensions.get("window"));
  };

  useEffect(() => {
    let windowListener = Dimensions.addEventListener("change", handleResize);

    let focusListener = navigation.addListener("focus", () => {
      getFavouriteDatas();
    });

    return () => {
      focusListener?.remove;
      windowListener?.remove;
    };
  }, []);

  const getFavouriteDatas = async () => {
    setIsLoading(false);
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.favourites, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        setIsLoading(false);
        setFavouriteData(result.data.favourites);
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

  const setFavourite = (coffeeCode) => {
    let newFavourites = favouriteData.filter((item)=>{
      if (item.cf_code!==coffeeCode){
        return item;
      }
    });

    setFavouriteData(newFavourites);
    setFavouriteAPI(coffeeCode);
  };

  const setFavouriteAPI = async (coffeeCode) => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.set_favourite, {
      fv_coffee: coffeeCode
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
  };

  const addCart = async (item) => {
    let data = {
      c_coffee: item.cf_code,
      c_sugar: sugarData[1].status,  // az şekerli
      c_size: item.cfp_size,
      c_qty: 1,
      c_price: item.cfp_price,
    };
    await props.CartStore.addToCart(data, 1);
    await props.AuthStore.getAccessToken();

    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.set_cart, data, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const status = res.status;
      const result = res.data;

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

  return (
    <AuthLayout>
      <View style={styles.container}>
        <CustomHeader title={"Favori Kahvelerim"} />
        {isLoading ? <Loader /> : (
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces
            ListEmptyComponent={() => <EmptyComponent />}
            style={{ marginTop: 10 }}
            data={favouriteData}
            keyExtractor={(item, index) => index.toString()} // Benzersiz anahtar
            renderItem={({ item }) => (
              <AllItems
                item={item}
                setFavourite={setFavourite}
                addCart={addCart}
                windowDimensions={windowDimensions}
                position={position}
              />
            )}
          />
        )}
      </View>
    </AuthLayout>
  );
};

export default inject("AuthStore","CartStore")(observer(Favourites));
