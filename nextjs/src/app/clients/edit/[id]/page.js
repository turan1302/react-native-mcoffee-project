"use client";

import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import Notification from "@/RestAPI/Notification";
import {useParams, useRouter} from "next/navigation";

const ClientsEditPage = (props) => {
    const params = useParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [client, setClient] = useState({});

    useEffect(() => {
        getClient();
    }, []);

    const getClient = async () => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.clients_edit + `/${params.id}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {
                setClient(result.data.client);
                setIsLoading(false);
            } else {
                if (status === 404) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    router.push("/clients/list");
                } else {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    props.AuthStore.removeToken();
                }
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

        await RestClient.postRequest(AppUrl.clients_update+`/${params.id}`, values, {
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
            } else {
                if (status === 422) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    setSubmitting(false);
                    props.AuthStore.removeToken();
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
        isLoading ? (
            <div>Yükleniyor...</div>
        ) : (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Kullanıcı Güncelle</h1>
                </div>

                <div className="row">

                    <div className="col-lg-12">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Kullanıcı Bilgileri</h6>
                            </div>
                            <div className="card-body container-fluid">
                                <Formik enableReinitialize={true} initialValues={{
                                    c_name: client.c_name,
                                    c_surname: client.c_surname,
                                    email: client.email,
                                    password : "",
                                    password_confirmation : ""
                                }} validationSchema={Yup.object().shape({
                                    c_name : Yup.string().required("Kullanıcı Adı alanı gereklidir"),
                                    c_surname : Yup.string().required("Kullanıcı Soyadı alanı gereklidir"),
                                    email : Yup.string().required("Kullanıcı E-Mail alanı gereklidir"),
                                    password : Yup.string().min(8,"Şİfre 8 karakterden az olamaz").max(16,"Şifreniz 16 karakterden fazla olamaz"),
                                    password_confirmation: Yup.string().min(8, "Şifre Tekrar alanı en az 8 karakter olmak zorundadır").max(16, "Şifre Tekrar alanı en fazla 16 karakter olmak zorundadır").oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor"),
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
                                                <div className={"col-md-12"}>
                                                    <label>Kullanıcı Adı</label>
                                                    <input placeholder={"Kullanıcı Adı..."} value={values.c_name}
                                                           onChange={handleChange('c_name')}
                                                           onBlur={handleBlur} name={"c_name"} className={"form-control"}/>
                                                    {(touched.c_name && errors.c_name) &&
                                                        <small className={"text-danger"}>{errors.c_name}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Kullanıcı Soyadı</label>
                                                    <input placeholder={"Kullanıcı Soyadı..."} value={values.c_surname}
                                                           onChange={handleChange('c_surname')}
                                                           onBlur={handleBlur} name={"c_surname"}
                                                           className={"form-control"}/>
                                                    {(touched.c_surname && errors.c_surname) &&
                                                        <small className={"text-danger"}>{errors.c_surname}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Kullanıcı E-Mail</label>
                                                    <input placeholder={"Kullanıcı E-Mail Adresi..."} value={values.email}
                                                           onChange={handleChange('email')}
                                                           onBlur={handleBlur} name={"email"}
                                                           className={"form-control"}/>
                                                    {(touched.email && errors.email) &&
                                                        <small className={"text-danger"}>{errors.email}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Kullanıcı Şifre</label>
                                                    <input type={"password"} placeholder={"Kullanıcı Şifre..."} value={values.password}
                                                           onChange={handleChange('password')}
                                                           onBlur={handleBlur} name={"password"}
                                                           className={"form-control"}/>
                                                    {(touched.password && errors.password) &&
                                                        <small className={"text-danger"}>{errors.password}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-2"}>
                                                    <label>Kullanıcı Şifre (Tekrar)</label>
                                                    <input type={"password"} placeholder={"Kullanıcı Şifre (Tekrar)..."} value={values.password_confirmation}
                                                           onChange={handleChange('password_confirmation')}
                                                           onBlur={handleBlur} name={"password_confirmation"}
                                                           className={"form-control"}/>
                                                    {(touched.password_confirmation && errors.password_confirmation) &&
                                                        <small className={"text-danger"}>{errors.password_confirmation}</small>}
                                                </div>
                                            </div>
                                            <div className={"row mt-3"}>
                                                <div className={"col-md-4"}>
                                                    <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit}
                                                            type={"button"} className={"btn btn-success btn-sm"}><i
                                                        className={"fa fa-edit"}></i> Güncelle
                                                    </button>
                                                    <Link href={"/clients/list"}
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

export default inject("AuthStore")(observer(ClientsEditPage));
