import React, { useEffect, useState } from "react";
import AuthLayout from "../../../components/Layout/AuthLayout";
import { inject, observer } from "mobx-react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../../components/Profile/CustomHeader";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../../RestAPI/RestClient";
import AppUrl from "../../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import styles from "./styles";
import Loader from "../../../components/common/Loader";

const AccountInfo = (props) => {
  const { navigation } = props;

  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [client, setClient] = useState({});


  useEffect(() => {
    let userFocus = navigation.addListener("focus", () => {
      getUserInfo();
    });

    return () => {
      userFocus?.remove;
    };
  }, []);

  const getUserInfo = async () => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.getRequest(AppUrl.profile, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {

      const result = res.data;
      const status = res.status;


      if (status === 200) {
        setIsLoading(false);
        setClient(result.data.user);
      }

      if (status === 401) {
        props.AuthStore.removeToken();
      }

    }).catch((err) => {
      console.log(err);
      props.AuthStore.removeToken();
    });
  };

  const _handleSubmit = async (values, { resetForm, setSubmitting }) => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.update_profile, values, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose: 2000,
        });
        setSubmitting(false);
        setTimeout(() => {
          props.AuthStore.tokenControl();
        }, 2000);
      } else {
        if (status === 422) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button: "Kapat",
            autoClose: 2000,
          });
          setSubmitting(false);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button: "Kapat",
            autoClose: 2000,
          });
          setSubmitting(false);
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
      setSubmitting(false);
      setTimeout(() => {
        props.AuthStore.tokenControl();
      }, 2000);
    });
  };

  return (
    <AuthLayout>
      {(isLoading) ? (<Loader />) : (<View style={styles.container}>
          <CustomHeader title={"Hesabım"} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Formik enableReinitialize={true} initialValues={{
              c_name: client.c_name,
              c_surname: client.c_surname,
              email: client.email,
              password: "",
              password_confirmation: "",
            }} validationSchema={Yup.object().shape({
              c_name: Yup.string().required("Adınız alanı zorunludur"),
              c_surname: Yup.string().required("Soyadınız alanı zorunludur"),
              email: Yup.string().required("E-Mail adresi alanı zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
              password: Yup.string().min(8, "Şifreniz en az 8 karakter olmak zorundadır").max(16, "Şifreniz en fazla 16 karakter olmak zorundadır"),
              password_confirmation: Yup.string().min(8, "Şifre Tekrar alanı 8 karakterden az olamaz").max(16, "Şifre tekrar alanı 16 karakterden fazla olamaz").oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor"),
            })} onSubmit={_handleSubmit}>
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
                <View style={styles.form_area}>
                  <View style={styles.name_area}>
                    <TextInput value={values.c_name} onChangeText={handleChange("c_name")}
                               onBlur={handleBlur("c_name")} style={styles.name_input}
                               placeholderTextColor={"#000"}
                               placeholder={"Adınız..."} />
                    <Entypo name={"user"} color={"#000"} size={20} style={styles.name_icon} />
                  </View>
                  {(touched.c_name && errors.c_name) && <Text style={styles.error_text}>{errors.c_name}</Text>}

                  <View style={styles.surname_area}>
                    <TextInput value={values.c_surname} onChangeText={handleChange("c_surname")}
                               onBlur={handleBlur("c_surname")} style={styles.surname_input}
                               placeholderTextColor={"#000"}
                               placeholder={"Soyadınız..."} />
                    <Entypo name={"user"} color={"#000"} size={20} style={styles.surname_icon} />
                  </View>
                  {(touched.c_surname && errors.c_surname) && <Text style={styles.error_text}>{errors.c_surname}</Text>}

                  <View style={styles.email_area}>
                    <TextInput value={values.email} onChangeText={handleChange("email")} onBlur={handleBlur("email")}
                               style={styles.email_input} placeholderTextColor={"#000"}
                               placeholder={"E-Mail Adresiniz..."} keyboardType={"email-address"} />
                    <Fontisto name={"email"} color={"#000"} size={20} style={styles.email_icon} />
                  </View>
                  {(touched.email && errors.email) && <Text style={styles.error_text}>{errors.email}</Text>}

                  <View style={styles.password_area}>
                    <TextInput value={values.password} onChangeText={handleChange("password")}
                               onBlur={handleBlur("password")} style={styles.password_input}
                               placeholderTextColor={"#000"}
                               placeholder={"Şifreniz..."} secureTextEntry={isSecure} />
                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                      <Ionicons name={isSecure ? "eye" : "eye-off"} size={20} color={"#000"}
                                style={styles.password_icon} />
                    </TouchableOpacity>
                  </View>
                  {(touched.password && errors.password) && <Text style={styles.error_text}>{errors.password}</Text>}

                  <View style={styles.password_confirmation_area}>
                    <TextInput value={values.password_confirmation}
                               onChangeText={handleChange("password_confirmation")}
                               onBlur={handleBlur("password_confirmation")} style={styles.password_confirmation_input}
                               placeholderTextColor={"#000"}
                               placeholder={"Şifreniz (Tekrar)..."} secureTextEntry={isConfirmSecure} />
                    <TouchableOpacity onPress={() => setIsConfirmSecure(!isConfirmSecure)}>
                      <Ionicons name={isConfirmSecure ? "eye" : "eye-off"} size={20} color={"#000"}
                                style={{ paddingHorizontal: 10 }} />
                    </TouchableOpacity>
                  </View>
                  {(touched.password_confirmation && errors.password_confirmation) &&
                    <Text style={styles.error_text}>{errors.password_confirmation}</Text>}

                  <TouchableOpacity onPress={handleSubmit} disabled={(!isValid || isSubmitting)}
                                    style={styles.button_area}>
                    <Text style={styles.button_text}>Bilgilerini güncelle</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      )}
    </AuthLayout>
  );
};

export default inject("AuthStore")(observer(AccountInfo));
