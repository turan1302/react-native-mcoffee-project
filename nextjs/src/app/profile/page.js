"use client";

import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import Notification from "@/RestAPI/Notification";

const ProfilePage = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [client, setClient] = useState({});

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        await props.AuthStore.getToken();
        const token = props.AuthStore.appState.user.access_token;

        await RestClient.getRequest(AppUrl.check, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        }).then((res) => {

            const result = res.data;
            const status = res.status;

            if (status === 200) {
                setIsLoading(false);
                setClient(result.data)
            }

            if (status === 401) {
                props.AuthStore.removeToken();
            }

        }).catch((err) => {
            console.log(err);
            props.AuthStore.removeToken();
        });
    }

    const _handleSubmit = async (values, {resetForm, setSubmitting}) => {
        props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.update, values, {
            headers: {
                "Authorization": "Bearer " + token
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
                resetForm();

                let userData = {
                    id: result.data.id,
                    name: result.data.name,
                    surname: result.data.surname,
                    email: result.data.email,
                    access_token: result.data.access_token,
                }

                let appState = {
                    isLoggedIn: true,
                    user: userData
                }

                props.AuthStore.saveToken(appState);
                setTimeout(()=>{
                    location.reload();
                },600);
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
                    <h1 className="h3 mb-0 text-gray-800">Profil</h1>
                </div>

                <div className="row">

                    <div className="col-lg-12">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Hesap Bilgileriniz</h6>
                            </div>
                            <div className="card-body container-fluid">
                                <Formik initialValues={{
                                    name: client.name,
                                    surname: client.surname,
                                    email: client.email,
                                    password: "",
                                    password_confirmation: ""
                                }} validationSchema={Yup.object().shape({
                                    name: Yup.string().required("Adınız alanı gereklidir"),
                                    surname: Yup.string().required("Soyadınız alanı gereklidir"),
                                    email: Yup.string().required("E-Mail Adresi alanı gereklidir"),
                                    password: Yup.string().min(8, "Şİfre 8 karakterden az olamaz").max(16, "Şifreniz 16 karakterden fazla olamaz"),
                                    password_confirmation: Yup.string().min(8, "Şifre (Tekrar) alanı en az 8 karakter olmak zorundadır").max(16, "Şifre Tekrar alanı en fazla 16 karakter olmak zorundadır").oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor"),
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
                                      }) => (
                                        <form className={"form-group"} method={"POST"}>
                                            <div className={"row"}>
                                                <div className={"col-md-12"}>
                                                    <label>Adınız</label>
                                                    <input placeholder={"Adınız..."} value={values.name}
                                                           onChange={handleChange('name')}
                                                           onBlur={handleBlur} name={"name"}
                                                           className={"form-control"}/>
                                                    {(touched.name && errors.name) &&
                                                        <small className={"text-danger"}>{errors.name}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Soyadınız</label>
                                                    <input placeholder={"Soyadınız..."} value={values.surname}
                                                           onChange={handleChange('surname')}
                                                           onBlur={handleBlur} name={"surname"}
                                                           className={"form-control"}/>
                                                    {(touched.surname && errors.surname) &&
                                                        <small className={"text-danger"}>{errors.surname}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>E-Mail Adresiniz</label>
                                                    <input placeholder={"E-Mail Adresiniz..."}
                                                           value={values.email}
                                                           onChange={handleChange('email')}
                                                           onBlur={handleBlur} name={"email"}
                                                           className={"form-control"}/>
                                                    {(touched.email && errors.email) &&
                                                        <small className={"text-danger"}>{errors.email}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Şifreniz</label>
                                                    <input type={"password"} placeholder={"Şifreniz..."}
                                                           value={values.password}
                                                           onChange={handleChange('password')}
                                                           onBlur={handleBlur} name={"password"}
                                                           className={"form-control"}/>
                                                    {(touched.password && errors.password) &&
                                                        <small className={"text-danger"}>{errors.password}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Şifre (Tekrar)</label>
                                                    <input type={"password"} placeholder={"Şifre (Tekrar)..."}
                                                           value={values.password_confirmation}
                                                           onChange={handleChange('password_confirmation')}
                                                           onBlur={handleBlur} name={"password_confirmation"}
                                                           className={"form-control"}/>
                                                    {(touched.password_confirmation && errors.password_confirmation) &&
                                                        <small
                                                            className={"text-danger"}>{errors.password_confirmation}</small>}
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

export default inject("AuthStore")(observer(ProfilePage));
