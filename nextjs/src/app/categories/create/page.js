"use client";

import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {inject,observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import Notification from "@/RestAPI/Notification";

const CategoriesCreatePage = (props) => {

    const _handleSubmit = async (values,{resetForm,setSubmitting})=>{
        props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.categories_store,values, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status===201){
                Notification.success({
                    title: result.title,
                    message: result.message
                });
                setSubmitting(false);
                resetForm();
            }else{
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
                <h1 className="h3 mb-0 text-gray-800">Yeni Kahve Kategorisi</h1>
            </div>

            <div className="row">

                <div className="col-lg-12">

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Kahve Kategorisi Bilgileri</h6>
                        </div>
                        <div className="card-body container-fluid">
                            <Formik initialValues={{
                                cfc_code: "",
                                cfc_name: ""
                            }} validationSchema={Yup.object().shape({
                                cfc_code : Yup.string().required("Kategori kodu alanı gereklidir"),
                                cfc_name : Yup.string().required("Kategori adı alanı gereklidir"),
                            })} onSubmit={_handleSubmit}>
                                {({
                                    touched,
                                    errors,
                                    values,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isValid,
                                    isSubmitting
                                  })=> (
                                    <form className={"form-group"} method={"POST"}>
                                        <div className={"row"}>
                                            <div className={"col-md-6"}>
                                                <label>Kategori Kodu</label>
                                                <input value={values.cfc_code} onChange={handleChange('cfc_code')} onBlur={handleBlur} name={"cfc_code"} className={"form-control"}/>
                                                {(touched.cfc_code && errors.cfc_code) && <small className={"text-danger"}>{errors.cfc_code}</small>}
                                            </div>
                                            <div className={"col-md-6"}>
                                                <label>Kategori Adı</label>
                                                <input value={values.cfc_name} onChange={handleChange('cfc_name')} onBlur={handleBlur} name={"cfc_name"} className={"form-control"}/>
                                                {(touched.cfc_name && errors.cfc_name) && <small className={"text-danger"}>{errors.cfc_name}</small>}
                                            </div>
                                        </div>
                                        <div className={"row mt-3"}>
                                            <div className={"col-md-4"}>
                                                <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit} type={"button"} className={"btn btn-success btn-sm"}><i
                                                    className={"fa fa-plus"}></i> Yeni Ekle
                                                </button>
                                                <Link href={"/categories/list"}
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

export default inject("AuthStore")(observer(CategoriesCreatePage));
