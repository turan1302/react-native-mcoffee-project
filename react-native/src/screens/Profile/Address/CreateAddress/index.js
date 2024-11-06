import React, { useMemo, useState } from "react";
import AuthLayout from "../../../../components/Layout/AuthLayout";
import { inject, observer } from "mobx-react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CreateCustomHeader from "../../../../components/Profile/Address/CreateCustomHeader";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RadioGroup from "react-native-radio-buttons-group";
import styles from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../../../RestAPI/RestClient";
import AppUrl from "../../../../RestAPI/AppUrl";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const CreateAddress = (props) => {
  const radioButtons = useMemo(() => ([
    {
      id: 0,
      label: "Bireysel",
      value: 0,
    },
    {
      id: 1,
      label: "Kurumsal",
      value: 1,
    },
  ]), []);

  const [corporateForm, setCorporateForm] = useState(0);

  const _handleSubmit = async (values, { resetForm, setSubmitting }) => {
    await props.AuthStore.getAccessToken();
    const token = props.AuthStore.appState.user.access_token;

    await RestClient.postRequest(AppUrl.address_create, values, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status===201){
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: result.title,
          textBody: result.message,
          autoClose : 2000
        });
        resetForm();
        setSubmitting(false);
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
      <View style={styles.container}>
        <CreateCustomHeader title={"Yeni Adres Ekle"} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik enableReinitialize={true} initialValues={{
            add_city: "",
            add_district: "",
            add_title: "",
            add_desc: "",
            add_tax_no: "",
            add_tax_office: "",
            add_type: corporateForm,
          }} validationSchema={Yup.object().shape({
            add_city : Yup.string().required("Şehir alanı gereklidir"),
            add_district : Yup.string().required("İlçe alanı gereklidir"),
            add_title : Yup.string().required("Adres Başlığı alanı gereklidir"),
            add_desc : Yup.string().required("Adresiniz alanı gereklidir"),
            add_tax_no: corporateForm === 1 ? Yup.string().required("Vergi Numarası alanı gereklidir") : Yup.string(),
            add_tax_office: corporateForm === 1 ? Yup.string().required("Vergi Dairesi alanı gereklidir") : Yup.string(),
          })} onSubmit={_handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting }) => (
              <View style={styles.form_area}>

                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setCorporateForm}
                  selectedId={corporateForm}
                  layout="row"
                />

                <View style={styles.city_area}>
                  <TextInput value={values.add_city} onChangeText={handleChange("add_city")}
                             onBlur={handleBlur("add_city")} placeholderTextColor={"#000"}
                             placeholder={"Şehir...."} style={styles.city_input} />
                  <FontAwesome5 name={"city"} color={"#000"} size={20} style={styles.city_icon} />
                </View>
                {(touched.add_city && errors.add_city) && <Text style={styles.error_text}>{errors.add_city}</Text>}

                <View style={styles.district_area}>
                  <TextInput value={values.add_district} onChangeText={handleChange("add_district")}
                             onBlur={handleBlur("add_district")} placeholderTextColor={"#000"}
                             placeholder={"İlçe...."} style={styles.district_input} />
                  <FontAwesome5 name={"city"} color={"#000"} size={20} style={styles.district_icon} />
                </View>
                {(touched.add_district && errors.add_district) && <Text style={styles.error_text}>{errors.add_district}</Text>}

                <View style={styles.address_title_area}>
                  <TextInput value={values.add_title} onChangeText={handleChange("add_title")}
                              onBlur={handleBlur("add_title")} placeholderTextColor={"#000"}
                             placeholder={"Adres Başlığı...."} style={styles.address_title_input} />
                  <Entypo name={"map"} color={"#000"} size={20} style={styles.address_title_icon} />
                </View>
                {(touched.add_title && errors.add_title) && <Text style={styles.error_text}>{errors.add_title}</Text>}

                <View style={styles.address_text_area}>
                  <TextInput value={values.add_desc} onChangeText={handleChange("add_desc")}
                             onBlur={handleBlur("add_desc")} multiline placeholderTextColor={"#000"}
                             placeholder={"Adresiniz...."} style={styles.address_text_input} />
                </View>
                {(touched.add_desc && errors.add_desc) && <Text style={styles.error_text}>{errors.add_desc}</Text>}


                {(corporateForm === 1) && (
                  <>
                    <View style={styles.tax_office_area}>
                      <TextInput value={values.add_tax_office} onChangeText={handleChange("add_tax_office")}
                                 onBlur={handleBlur("add_tax_office")} placeholderTextColor={"#000"}
                                 placeholder={"Vergi Dairesi"} style={styles.tax_office_input} />
                    </View>
                    {(touched.add_tax_office && errors.add_tax_office) && <Text style={styles.error_text}>{errors.add_tax_office}</Text>}

                    <View style={styles.tax_no_area}>
                      <TextInput value={values.add_tax_no} onChangeText={handleChange("add_tax_no")}
                                 onBlur={handleBlur("add_tax_no")} keyboardType={"number-pad"} placeholderTextColor={"#000"}
                                 placeholder={"Vergi Numarası"} style={styles.tax_no_input} />
                    </View>
                    {(touched.add_tax_no && errors.add_tax_no) && <Text style={styles.error_text}>{errors.add_tax_no}</Text>}
                  </>
                )}

                <TouchableOpacity onPress={handleSubmit} disabled={(!isValid || isSubmitting)}
                                  style={styles.save_button_area}>
                  <Text style={styles.save_button_text}>Yeni Adres Ekle</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </AuthLayout>
  );
};

export default inject("AuthStore")(observer(CreateAddress));
