"use client";

import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import Notification from "@/RestAPI/Notification";

const SettingsPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({});

    const [previewIcon, setPreviewIcon] = useState(null);
    const [previewFavicon, setPreviewFavicon] = useState(null);

    useEffect(() => {
        getSettings();
    }, []);

    const getSettings = async () => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.settings, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;
            if (status === 200) {
                setSettings(result.data.settings);
                setIsLoading(false);
            } else {
                Notification.error({
                    title: result.title,
                    message: result.message
                });
            }
        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Sunucu bazlı hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    const _handleSubmit = async (values, {resetForm, setSubmitting}) => {
        props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.settings_update, values, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {
                Notification.success({
                    title: result.title,
                    message: result.message
                });
                setSubmitting(false);
            } else {
                if (status===422){
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    setSubmitting(false);
                }else{
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    setSubmitting(false);
                }
            }

        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Sunucu bazlı hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            });
            setSubmitting(false);
        })

    }

    return (
        isLoading ? (
            <div>Yükleniyor...</div>
        ) : (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Site Ayarları</h1>
                </div>

                <div className="row">

                    <div className="col-lg-12">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Site Bilgileri</h6>
                            </div>
                            <div className="card-body container-fluid">
                                <Formik enableReinitialize={true} initialValues={{
                                    set_url: settings.set_url,
                                    set_title: settings.set_title,
                                    set_desc: settings.set_desc,
                                    set_keyw: settings.set_keyw,
                                    set_slogan: settings.set_slogan,
                                    set_tel: settings.set_tel,
                                    set_address: settings.set_address,
                                    set_map: settings.set_map,
                                    set_map_status: settings.set_map_status,
                                    set_mail: settings.set_mail,
                                    set_status: settings.set_status,
                                    set_icon: settings.set_icon,
                                    set_favicon: settings.set_favicon,
                                    set_google_verify_code: settings.set_google_verify_code,
                                    set_yandex_verify_code: settings.set_yandex_verify_code,
                                    set_bing_verify_code: settings.set_bing_verify_code,
                                    set_analiytcs_code: settings.set_analiytcs_code,
                                    set_kdv: settings.set_kdv,
                                    set_courier_price: settings.set_courier_price,
                                }} validationSchema={Yup.object().shape({
                                    set_url: Yup.string().required("Site URL alanı gereklidir").nullable(),
                                    set_title: Yup.string().required("Site Başlık alanı gereklidir").nullable(),
                                    set_desc: Yup.string().required("Site Açıklama alanı gereklidir").nullable(),
                                    set_keyw: Yup.string().required("Site Anahtar Kelime alanı gereklidir").nullable(),
                                    set_slogan: Yup.string().required("Site Slogan alanı gereklidir").nullable(),
                                    set_tel: Yup.string().required("Site Telefon alanı gereklidir").nullable(),
                                    set_address: Yup.string().required("Site Adres alanı gereklidir").nullable(),
                                    set_map: Yup.string().required("Site Harita alanı gereklidir").nullable(),
                                    set_map_status: Yup.string().required("Site Harita Durumu alanı gereklidir").nullable(),
                                    set_mail: Yup.string().required("Site Mail alanı gereklidir").email("Lütfen geçerli bir E-Mail adresi giriniz").nullable(),
                                    set_status: Yup.string().required("Site Durumu alanı gereklidir").nullable(),
                                    set_icon: Yup.mixed()
                                        .test('fileType', 'Sadece JPG, PNG veya JPEG dosyaları kabul edilir', value => {
                                            return !value || ['image/jpeg', 'image/png'].includes(value?.type);
                                        }).nullable(),
                                    set_favicon: Yup.mixed()
                                        .test('fileType', 'Sadece JPG, PNG veya JPEG dosyaları kabul edilir', value => {
                                            return !value || ['image/jpeg', 'image/png'].includes(value?.type);
                                        }).nullable(),
                                    set_google_verify_code: Yup.string().required("Google Doğrulama Kodu alanı gereklidir").nullable(),
                                    set_yandex_verify_code: Yup.string().required("Yandex Doğrulama Kodu alanı gereklidir").nullable(),
                                    set_bing_verify_code: Yup.string().required("Bing Doğrulama Kodu alanı gereklidir").nullable(),
                                    set_analiytcs_code: Yup.string().required("Analytcs Kodu alanı gereklidir").nullable(),
                                    set_kdv: Yup.string().required("Site KDV alanı gereklidir").nullable(),
                                    set_courier_price: Yup.string().required("Kurye Ücreti alanı gereklidir").nullable()
                                })} onSubmit={_handleSubmit}>
                                    {({
                                          touched,
                                          errors,
                                          values,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          isValid,
                                          isSubmitting,
                                          setFieldValue
                                      }) => (
                                        <form className={"form-group"} method={"POST"}>
                                            <div className={"row"}>
                                                <div className={"col-md-12"}>
                                                    <label>Site URL</label>
                                                    <input defaultValue={values.set_url}
                                                           onChange={handleChange('set_url')}
                                                           onBlur={handleBlur} name={"set_url"}
                                                           className={"form-control"}/>
                                                    {(touched.set_url && errors.set_url) &&
                                                        <small className={"text-danger"}>{errors.set_url}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Başlık</label>
                                                    <input defaultValue={values.set_title}
                                                           onChange={handleChange('set_title')}
                                                           onBlur={handleBlur} name={"set_title"}
                                                           className={"form-control"}/>
                                                    {(touched.set_title && errors.set_title) &&
                                                        <small className={"text-danger"}>{errors.set_title}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Açıklama</label>
                                                    <textarea defaultValue={values.set_desc}
                                                              onChange={handleChange('set_desc')}
                                                              onBlur={handleBlur} name={"set_desc"} rows={3}
                                                              className={"form-control"}/>
                                                    {(touched.set_desc && errors.set_desc) &&
                                                        <small className={"text-danger"}>{errors.set_desc}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Anahtar Kelimeler</label>
                                                    <input defaultValue={values.set_keyw}
                                                           onChange={handleChange('set_keyw')}
                                                           onBlur={handleBlur} name={"set_keyw"}
                                                           className={"form-control"}/>
                                                    {(touched.set_keyw && errors.set_keyw) &&
                                                        <small className={"text-danger"}>{errors.set_keyw}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Slogan</label>
                                                    <input defaultValue={values.set_slogan}
                                                           onChange={handleChange('set_slogan')}
                                                           onBlur={handleBlur} name={"set_slogan"}
                                                           className={"form-control"}/>
                                                    {(touched.set_slogan && errors.set_slogan) &&
                                                        <small className={"text-danger"}>{errors.set_slogan}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Telefon</label>
                                                    <input defaultValue={values.set_tel}
                                                           onChange={handleChange('set_tel')}
                                                           onBlur={handleBlur} name={"set_tel"}
                                                           className={"form-control"}/>
                                                    {(touched.set_tel && errors.set_tel) &&
                                                        <small className={"text-danger"}>{errors.set_tel}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Adres</label>
                                                    <textarea defaultValue={values.set_address}
                                                              onChange={handleChange('set_address')}
                                                              onBlur={handleBlur} name={"set_address"}
                                                              className={"form-control"} rows={3}/>
                                                    {(touched.set_address && errors.set_address) &&
                                                        <small className={"text-danger"}>{errors.set_address}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Harita</label>
                                                    <textarea defaultValue={values.set_map}
                                                              onChange={handleChange('set_map')}
                                                              onBlur={handleBlur} name={"set_map"}
                                                              className={"form-control"} rows={4}/>
                                                    {(touched.set_map && errors.set_map) &&
                                                        <small className={"text-danger"}>{errors.set_map}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Harita Durum</label>
                                                    <select name={"set_map_status"} value={values.set_map_status}
                                                            onChange={handleChange}
                                                            className={"form-control"}>
                                                        <option value={"1"}>Aktif</option>
                                                        <option value={"0"}>Pasif</option>
                                                    </select>
                                                    {(touched.set_map_status && errors.set_map_status) &&
                                                        <small
                                                            className={"text-danger"}>{errors.set_map_status}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site E-Mail</label>
                                                    <input defaultValue={values.set_mail}
                                                           onChange={handleChange('set_mail')}
                                                           onBlur={handleBlur} name={"set_mail"}
                                                           className={"form-control"}/>
                                                    {(touched.set_mail && errors.set_mail) &&
                                                        <small className={"text-danger"}>{errors.set_mail}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Durum</label>
                                                    <select value={values.set_status} name={"set_status"}
                                                            onChange={handleChange("set_status")}
                                                            className={"form-control"}>
                                                        <option value={"1"}>Aktif</option>
                                                        <option value={"0"}>Pasif</option>
                                                    </select>
                                                    {(touched.set_status && errors.set_status) &&
                                                        <small className={"text-danger"}>{errors.set_status}</small>}
                                                </div>
                                                {previewIcon ? (
                                                    <div className={"col-md-12 mt-2"}>
                                                        <img src={previewIcon} style={{ width: '100px', height: '100px' }} />
                                                    </div>
                                                ) : (
                                                    <div className={"col-md-12 mt-2"}>
                                                        <img src={AppUrl.imageUrl+settings.set_icon}
                                                             style={{width: '100px', height: '100px'}}/>
                                                    </div>
                                                )}
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Icon</label>
                                                    <input
                                                        name="set_icon"
                                                        type="file"
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files[0];
                                                            if (file) {
                                                                setFieldValue('set_icon', file);

                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setPreviewIcon(reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                        onBlur={handleBlur}
                                                        className="form-control"
                                                    />
                                                    {touched.set_icon && errors.set_icon && <small className="text-danger">{errors.set_icon}</small>}
                                                </div>

                                                {previewFavicon ? (
                                                    <div className={"col-md-12 mt-2"}>
                                                        <img src={previewFavicon} style={{ width: '100px', height: '100px' }} />
                                                    </div>
                                                ) : (
                                                    <div className={"col-md-12 mt-2"}>
                                                        <img src={AppUrl.imageUrl+settings.set_favicon}
                                                             style={{width: '100px', height: '100px'}}/>
                                                    </div>
                                                )}
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Site Favicon</label>
                                                    <input
                                                        name="set_favicon"
                                                        type="file"
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files[0];
                                                            if (file) {
                                                                setFieldValue('set_favicon', file);

                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setPreviewFavicon(reader.result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                        onBlur={handleBlur}
                                                        className="form-control"
                                                    />
                                                    {touched.set_favicon && errors.set_favicon && <small className="text-danger">{errors.set_favicon}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Google Doğrulama Kodu</label>
                                                    <input defaultValue={values.set_google_verify_code}
                                                           onChange={handleChange('set_google_verify_code')}
                                                           onBlur={handleBlur} name={"set_google_verify_code"}
                                                           className={"form-control"}/>
                                                    {(touched.set_google_verify_code && errors.set_google_verify_code) &&
                                                        <small
                                                            className={"text-danger"}>{errors.set_google_verify_code}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Yandex Doğrulama Kodu</label>
                                                    <input defaultValue={values.set_yandex_verify_code}
                                                           onChange={handleChange('set_yandex_verify_code')}
                                                           onBlur={handleBlur} name={"set_yandex_verify_code"}
                                                           className={"form-control"}/>
                                                    {(touched.set_yandex_verify_code && errors.set_yandex_verify_code) &&
                                                        <small
                                                            className={"text-danger"}>{errors.set_yandex_verify_code}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Bing Doğrulama Kodu</label>
                                                    <input defaultValue={values.set_bing_verify_code}
                                                           onChange={handleChange('set_bing_verify_code')}
                                                           onBlur={handleBlur} name={"set_bing_verify_code"}
                                                           className={"form-control"}/>
                                                    {(touched.set_bing_verify_code && errors.set_bing_verify_code) &&
                                                        <small
                                                            className={"text-danger"}>{errors.set_bing_verify_code}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Analytcs Kodu</label>
                                                    <input defaultValue={values.set_analiytcs_code}
                                                           onChange={handleChange('set_analiytcs_code')}
                                                           onBlur={handleBlur} name={"set_analiytcs_code"}
                                                           className={"form-control"}/>
                                                    {(touched.set_analiytcs_code && errors.set_analiytcs_code) &&
                                                        <small
                                                            className={"text-danger"}>{errors.set_analiytcs_code}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>KDV</label>
                                                    <input type={"number"} step={"0.01"}
                                                           onChange={handleChange('set_kdv')}
                                                           onBlur={handleBlur} name={"set_kdv"}
                                                           defaultValue={values.set_kdv}
                                                           className={"form-control"}/>
                                                    {(touched.set_kdv && errors.set_kdv) &&
                                                        <small className={"text-danger"}>{errors.set_kdv}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Kurye Ücreti</label>
                                                    <input type={"number"} step={"0.01"}
                                                           defaultValue={values.set_courier_price}
                                                           onChange={handleChange('set_courier_price')}
                                                           onBlur={handleBlur} name={"set_courier_price"}
                                                           className={"form-control"}/>
                                                    {(touched.set_courier_price && errors.set_courier_price) &&
                                                        <small
                                                            className={"text-danger"}>{errors.set_courier_price}</small>}
                                                </div>
                                            </div>
                                            <div className={"row mt-3"}>
                                                <div className={"col-md-4"}>
                                                    <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit}
                                                            type={"button"} className={"btn btn-success btn-sm"}><i
                                                        className={"fa fa-edit"}></i> Güncelle
                                                    </button>
                                                    <Link href={"/home"}
                                                          className={"btn btn-danger btn-sm ml-3"}><i
                                                        className={"fa fa-times"}></i> Vazgeç</Link>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    )
}

export default inject("AuthStore")(observer(SettingsPage));
