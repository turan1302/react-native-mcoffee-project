import React, { useEffect, useState, useMemo } from "react";
import {
  Dimensions,
  FlatList, RefreshControl,
  Text,
  View,
} from "react-native";
import AuthLayout from "../../components/Layout/AuthLayout";
import CustomHeader from "../../components/Home/CustomHeader";
import styles from "./styles";
import SearchBar from "../../components/Home/SearchBar";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { inject, observer } from "mobx-react";
import Loader from "../../components/common/Loader";
import Categories from "../../components/Home/Categories";
import Campaigns from "../../components/Home/Campaigns";
import MostVotes from "../../components/Home/MostVotes";
import AllItems from "../../components/Home/AllItems";
import EmptyComponent from "../../components/Home/AllItems/EmptyComponent";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import sugarData from "../../config/sugarData";

const Home = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [mostVotes, setMostVotes] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const position = (windowDimensions.width < windowDimensions.height) ? "PORTRAIT" : "LANDSCAPE";

  const handleResize = () => {
    setWindowDimensions(Dimensions.get("window"));
  };

  const setFavourite = (coffeeCode) => {
    setCampaigns((prevCampaigns) => {
      const updatedCampaigns = prevCampaigns.map((item) =>
        item.cf_code === coffeeCode ? { ...item, cf_favourite: !item.cf_favourite } : item,
      );

      return updatedCampaigns;
    });

    setMostVotes((prevMostVotes) => {
      const updatedMostVotes = prevMostVotes.map((item) =>
        item.cf_code === coffeeCode ? { ...item, cf_favourite: !item.cf_favourite } : item,
      );

      return updatedMostVotes;
    });

    setAllItems((prevAllItems) => {
      const updatedCampaigns = campaigns.map((item) =>
        item.cf_code === coffeeCode ? { ...item, cf_favourite: !item.cf_favourite } : item,
      );

      const updatedMostVotes = mostVotes.map((item) =>
        item.cf_code === coffeeCode ? { ...item, cf_favourite: !item.cf_favourite } : item,
      );

      return filterUniqueItems([...updatedCampaigns, ...updatedMostVotes]);
    });

    setFavouriteAPI(coffeeCode);
  };

  const updateAllItems = (updatedCampaigns, updatedMostVotes, all) => {
    const newAllItems = filterUniqueItems([...updatedCampaigns, ...updatedMostVotes, ...all]);
    setAllItems(newAllItems);
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

  const filterUniqueItems = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
      const duplicate = seen.has(item.cf_id);
      seen.add(item.cf_id);
      return !duplicate;
    });
  };

  const filterCategory = (categoryCode) => {
    const newCampaigns = campaigns.filter((item) => item.category_code === categoryCode);
    const newMostVotes = mostVotes.filter((item) => item.category_code === categoryCode);
    const newAll = allItems.filter((item) => item.category_code === categoryCode);
    updateAllItems(newCampaigns, newMostVotes, newAll);
  };

  useEffect(() => {
    const getDataAndFilter = async () => {
      await getDatas();
      if (selectedCategory) {
        filterCategory(selectedCategory);
      }
    };
    getDataAndFilter();
  }, [selectedCategory]);

  useEffect(() => {
    let windowListener = Dimensions.addEventListener("change", handleResize);

    let focusListener = navigation.addListener("focus", () => {
      getDatas();
    });

    return () => {
      windowListener?.remove;
      focusListener?.remove;
    };
  }, []);

  const getDatas = async () => {
    setIsLoading(true);
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.home, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        setIsLoading(false);
        setCategories(result.data.categories);
        setCampaigns(result.data.campaigns);
        setMostVotes(result.data.most_votes);
        updateAllItems(result.data.campaigns, result.data.most_votes, result.data.all);
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

  const listHeaderComponent = useMemo(() => (
    <>
      <SearchBar />
      <Categories
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        categories={categories}
      />
      <Campaigns
        addCart={addCart}
        setFavourite={setFavourite}
        campaigns={campaigns}
        windowDimensions={windowDimensions}
      />
      <MostVotes
        addCart={addCart}
        setFavourite={setFavourite}
        mostVotes={mostVotes}
        windowDimensions={windowDimensions}
      />
      <Text style={{ fontWeight: "bold", color: "#000", fontSize: 17, paddingLeft: 10, marginVertical: 10 }}>
        Tüm Ürünler
      </Text>
    </>
  ), [categories, selectedCategory, campaigns, mostVotes]);

  return (
    <AuthLayout>
      <View style={styles.container}>
        <CustomHeader title={"mCoffee"} />
        {isLoading ? <Loader /> : (
          <View>
            <FlatList
              refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getDatas}/>}
              showsVerticalScrollIndicator={false}
              bounces
              ListEmptyComponent={() => <EmptyComponent />}
              ListHeaderComponent={listHeaderComponent} // useMemo ile sarmaladı
              style={{ marginBottom: 60 }}
              data={allItems}
              keyExtractor={(item) => item.cf_id.toString()} // Benzersiz anahtar
              renderItem={({ item }) => (
                <AllItems
                  addCart={addCart}
                  setFavourite={setFavourite}
                  item={item}
                  windowDimensions={windowDimensions}
                  position={position}
                />
              )}
            />
          </View>
        )}
      </View>
    </AuthLayout>
  );
};

export default inject("AuthStore", "CartStore")(observer(Home));
