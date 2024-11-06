import React, { useState } from "react";
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { inject,observer } from "mobx-react";



const Login = (props) => {

  const [isSecure, setIsSecure] = useState(true);
  const {navigation} = props;

  const _handleSubmit = async (values, { resetForm, setSubmitting }) => {
    await RestClient.postRequest(AppUrl.login, values).then((res) => {
      const status = res.status;
      const result = res.data;

      if (status === 200) {
        let userData = {
          id: result.data.id,
          c_name: result.data.c_name,
          c_surname: result.data.c_surname,
          email: result.data.email,
          access_token: result.data.access_token,
        };

        let appState = {
          isLoggedIn: true,
          user: userData,
        };

        props.AuthStore.saveToken(appState);
        setSubmitting(false);
        resetForm();
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose : 2000
        });
        setTimeout(() => {
          navigation.navigate("Welcome");
        }, 2000);

      } else {
        if (status === 422) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        } else if (status === 401) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        }
      }

    }).catch((err) => {
      console.log(err);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Sunucu bazlı bir hata oluştu. Lütfrn daha sonra tekrar deneyiniz",
        button : "Kapat",
        autoClose : 2000
      });
      setSubmitting(false);
    });
  };


  return (
    <ImageBackground style={styles.container}
                     source={require("../../assets/main/2.jpeg")}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik enableReinitialize={true} initialValues={{
          email: "",
          password: "",
        }} validationSchema={Yup.object().shape({
          email: Yup.string().required("E-Mail adresi zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
          password: Yup.string().required("Şifre alanı zorunludur").min(8, "Şifreniz en az 8 karakter olmak zorundadır").max(16, "Şifreniz en fazla 16 karakter olmak zorundadır"),
        })} onSubmit={_handleSubmit}>
          {({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, isSubmitting}) => (
            <View
              style={styles.form_area}>
              <Text style={styles.form_title}>mCoffee Giriş Formu</Text>
              <View style={styles.email_area}>
                <TextInput
                  value={values.email} onChangeText={handleChange("email")} onBlur={handleBlur("email")}
                  keyboardType={"email-address"} style={styles.email_input} placeholderTextColor={"#000"}
                           placeholder={"E-Mail Adresiniz..."} />
                <Fontisto name={"email"} color={"#000"} size={20} style={styles.email_icon} />
              </View>
              {(touched.email && errors.email) && <Text style={styles.error_text}>{errors.email}</Text>}

              <View style={styles.password_area}>
                <TextInput
                  value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')}
                  secureTextEntry={isSecure} style={styles.password_input} placeholderTextColor={"#000"}
                           placeholder={"Şifreniz..."} />
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                  <Ionicons name={isSecure ? "eye" : "eye-off"} color={"#000"} size={20} style={styles.password_icon} />
                </TouchableOpacity>
              </View>
              {(touched.password && errors.password) && <Text style={styles.error_text}>{errors.password}</Text>}

              <TouchableOpacity
                onPress={handleSubmit} disabled={(!isValid || isSubmitting)}
                style={styles.login_button_area}>
                <Text style={styles.login_button_text}>Giriş Yap</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signup_text_area} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signup_text}>Henüz hesabın yok mu ? Hemen Katıl</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </ImageBackground>

  );
};

export default inject("AuthStore")(observer(Login));
