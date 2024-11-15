"use client";

import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import Notification from "@/RestAPI/Notification";

const CoffeeCreatePage = (props) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        getCategories();
    },[]);

    const getCategories = async ()=>{
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.coffees_create, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;
            if (status === 200) {
                setCategories(result.data.categories);
            } else {
                Notification.error({
                    title: result.title,
                    message: result.message
                });
                props.AuthStore.removeToken();
            }
        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Sunucu bazlı hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            });
            props.AuthStore.removeToken();
        })
    }

    const _handleSubmit = async (values, {resetForm, setSubmitting}) => {
        props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.coffees_store, values, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type" : "multipart/form-data"
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 201) {
                Notification.success({
                    title: result.title,
                    message: result.message
                });
                setSubmitting(false);
                resetForm();
                setPreviewImage(null);
            } else {
                if (status === 422) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    setSubmitting(false);
                } else {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    setSubmitting(false);
                    props.AuthStore.removeToken();
                }
            }

        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Sunucu bazlı hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            });
            setSubmitting(false);
            props.AuthStore.removeToken();
        })
    }

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Yeni Kahve</h1>
            </div>

            <div className="row">

                <div className="col-lg-12">

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Kahve Bilgileri</h6>
                        </div>
                        <div className="card-body container-fluid">
                            <Formik initialValues={{
                                cf_code: "",
                                cf_category : "",
                                cf_name: "",
                                cf_desc: "",
                                cf_roasted: "",
                                cf_ingredients: "",
                                cf_image: ""
                            }} validationSchema={Yup.object().shape({
                                cf_code: Yup.string().required("Kahve kodu alanı gereklidir"),
                                cf_category: Yup.string().required("Kahve kategori alanı gereklidir"),
                                cf_name: Yup.string().required("Kahve adı alanı gereklidir"),
                                cf_desc: Yup.string().required("Kahve açıklama alanı gereklidir"),
                                cf_roasted: Yup.string().required("Kahve karulmuş içerik alanı gereklidir"),
                                cf_ingredients: Yup.string().required("Kahve içindekiler alanı gereklidir"),
                                cf_image: Yup.string().nullable()
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
                                            <div className={"col-md-4"}>
                                                <label>Kahve Kodu</label>
                                                <input value={values.cf_code} onChange={handleChange('cf_code')}
                                                       onBlur={handleBlur} name={"cf_code"} className={"form-control"}/>
                                                {(touched.cf_code && errors.cf_code) &&
                                                    <small className={"text-danger"}>{errors.cf_code}</small>}
                                            </div>
                                            <div className={"col-md-4"}>
                                                <label>Kahve Kategorisi</label>
                                                <select name={"cf_category"} value={values.cf_category}
                                                        onChange={handleChange}
                                                        className={"form-control"}>
                                                    {categories.map((item,index)=> (
                                                        <option key={index} value={item.cfc_code}>{item.cfc_name}</option>
                                                    ))}
                                                </select>
                                                {(touched.cf_category && errors.cf_category) &&
                                                    <small className={"text-danger"}>{errors.cf_category}</small>}
                                            </div>
                                            <div className={"col-md-4"}>
                                                <label>Kahve Adı</label>
                                                <input value={values.cf_name} onChange={handleChange('cf_name')}
                                                       onBlur={handleBlur} name={"cf_name"} className={"form-control"}/>
                                                {(touched.cf_name && errors.cf_name) &&
                                                    <small className={"text-danger"}>{errors.cf_name}</small>}
                                            </div>
                                        </div>
                                        <div className={"row mt-2"}>
                                            <div className={"col-md-12"}>
                                                <label>Kahve Açıklama</label>
                                                <textarea value={values.cf_desc} onChange={handleChange('cf_desc')}
                                                          onBlur={handleBlur} name={"cf_desc"}
                                                          className={"form-control"} rows={4}/>
                                                {(touched.cf_desc && errors.cf_desc) &&
                                                    <small className={"text-danger"}>{errors.cf_desc}</small>}
                                            </div>
                                        </div>
                                        <div className={"row mt-2"}>
                                            <div className={"col-md-6"}>
                                                <label>Kahve Kavrulmuş İçerik</label>
                                                <input value={values.cf_roasted} onChange={handleChange('cf_roasted')}
                                                       onBlur={handleBlur} name={"cf_roasted"}
                                                       className={"form-control"}/>
                                                {(touched.cf_roasted && errors.cf_roasted) &&
                                                    <small className={"text-danger"}>{errors.cf_roasted}</small>}
                                            </div>
                                            <div className={"col-md-6"}>
                                                <label>İçindekiler</label>
                                                <input value={values.cf_ingredients}
                                                       onChange={handleChange('cf_ingredients')}
                                                       onBlur={handleBlur} name={"cf_ingredients"}
                                                       className={"form-control"}/>
                                                {(touched.cf_ingredients && errors.cf_ingredients) &&
                                                    <small className={"text-danger"}>{errors.cf_ingredients}</small>}
                                            </div>
                                        </div>
                                        {previewImage && (
                                            <div className={"col-md-12 mt-2"}>
                                                <img src={previewImage} style={{width: '100px', height: '100px'}}/>
                                            </div>
                                        )}
                                        <div className={"row mt-2"}>
                                            <div className={"col-md-12"}>
                                                <label>Kahve Resmi</label>
                                                <input
                                                    name="cf_image"
                                                    type="file"
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        if (file) {
                                                            setFieldValue('cf_image', file);

                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setPreviewImage(reader.result);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    onBlur={handleBlur}
                                                    className="form-control"
                                                />
                                                {touched.cf_image && errors.cf_image &&
                                                    <small className="text-danger">{errors.cf_image}</small>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-4"}>
                                                <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit}
                                                        type={"button"} className={"btn btn-success btn-sm"}><i
                                                    className={"fa fa-plus"}></i> Yeni Ekle
                                                </button>
                                                <Link href={"/coffees/list"}
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
}

export default inject("AuthStore")(observer(CoffeeCreatePage));
