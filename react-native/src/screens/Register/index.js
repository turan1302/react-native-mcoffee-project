import React, { useState } from "react";
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const Register = (props) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);
  const {navigation} = props;

  const _handleSubmit = async (values, { resetForm, setSubmitting }) => {

    await RestClient.postRequest(AppUrl.register,values).then((res)=>{
      const status = res.status;
      const result = res.data;

      if (status===201){
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose : 2000
        });
        resetForm();
        setSubmitting(false);
        setTimeout(()=>{
          navigation.navigate('Login');
        },2000);
      }else{
        if (status===422){
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: result.title,
            textBody: result.message,
            button : "Kapat",
            autoClose : 2000
          });
          setSubmitting(false);
        }else{
          setSubmitting(false);
        }
      }
    }).catch((err)=>{
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Sunucu bazlı bir hata oluştu. Lütfen daha sonra tekrar deneyiniz",
        button : "Kapat",
        autoClose : 2000
      });
      setSubmitting(false);
    })
  };

  return (
    <ImageBackground style={styles.container}
                     source={require("../../assets/main/3.jpeg")}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik initialValues={{
          c_name: "",
          c_surname: "",
          email: "",
          password: "",
          password_confirmation: "",
        }} validationSchema={Yup.object().shape({
          c_name: Yup.string().required("Adınız alanı zorunludur"),
          c_surname: Yup.string().required("Soyadınız alanı zorunludur"),
          email: Yup.string().required("E-Mail adresi alanı zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
          password: Yup.string().required("Şifre alanı zorunludur").min(8, "Şifreniz en az 8 karakter olmak zorundadır").max(16, "Şifreniz en fazla 16 karakter olmak zorundadır"),
          password_confirmation: Yup.string().required("Şifre Tekrar alanı Zorunludur").min(8, "Şifre Tekrar alanı 8 karakterden az olamaz").max(16, "Şifre tekrar alanı 16 karakterden fazla olamaz").oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor"),
        })} onSubmit={_handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
            <View
              style={styles.form_area}>
              <Text style={styles.form_title}>mCoffee Kayıt Formu</Text>
              <View style={styles.name_area}>
                <TextInput
                  value={values.c_name} onChangeText={handleChange("c_name")} onBlur={handleBlur("c_name")}
                  style={styles.name_input} placeholderTextColor={"#000"} placeholder={"Adınız..."} />
                <Entypo name={"user"} color={"#000"} size={20} style={styles.name_icon} />
              </View>
              {(touched.c_name && errors.c_name) && <Text style={styles.error_text}>{errors.c_name}</Text>}

              <View style={styles.surname_area}>
                <TextInput
                  value={values.c_surname} onChangeText={handleChange("c_surname")} onBlur={handleBlur("c_surname")}
                  style={styles.surname_input} placeholderTextColor={"#000"} placeholder={"Soyadınız..."} />
                <Entypo name={"user"} color={"#000"} size={20} style={styles.surname_icon} />
              </View>
              {(touched.c_surname && errors.c_surname) && <Text style={styles.error_text}>{errors.c_surname}</Text>}

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
                  value={values.password} onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureTextEntry={isSecure} style={styles.password_input} placeholderTextColor={"#000"}
                           placeholder={"Şifreniz..."} />
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                  <Ionicons name={isSecure ? "eye" : "eye-off"} size={20} color={"#000"} style={styles.password_icon} />
                </TouchableOpacity>
              </View>
              {(touched.password && errors.password) && <Text style={styles.error_text}>{errors.password}</Text>}

              <View style={styles.password_confirm_area}>
                <TextInput
                  value={values.password_confirmation} onChangeText={handleChange("password_confirmation")}
                  onBlur={handleBlur("password_confirmation")}
                  secureTextEntry={isConfirmSecure} style={styles.password_confirm_input}
                           placeholderTextColor={"#000"}
                           placeholder={"Şifreniz (Tekrar)..."} />
                <TouchableOpacity onPress={() => setIsConfirmSecure(!isConfirmSecure)}>
                  <Ionicons name={isConfirmSecure ? "eye" : "eye-off"} size={20} color={"#000"}
                            style={styles.password_icon} />
                </TouchableOpacity>
              </View>
              {(touched.password_confirmation && errors.password_confirmation) &&
                <Text style={styles.error_text}>{errors.password_confirmation}</Text>}

              <TouchableOpacity
                onPress={handleSubmit} disabled={(!isValid || isSubmitting)}
                style={styles.register_button_area}>
                <Text style={styles.register_button_text}>Kayıt Ol</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signin_text_area} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signin_text}>Zaten üye misin ? Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </ImageBackground>

  );
};

export default Register;
