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

const SSSEditPage = (props) => {
    const params = useParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [sss, setSSS] = useState({});

    useEffect(() => {
        getSSS();
    }, []);

    const getSSS = async () => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.sss_edit + `/${params.id}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;
            if (status === 200) {
                setSSS(result.data.sss);
                setIsLoading(false);
            } else {
                if (status === 404) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    router.push("/sss/list");
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

        await RestClient.postRequest(AppUrl.sss_update+`/${params.id}`, values, {
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
                    <h1 className="h3 mb-0 text-gray-800">Yeni Kahve Kategorisi</h1>
                </div>

                <div className="row">

                    <div className="col-lg-12">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Kahve Kategorisi Bilgileri</h6>
                            </div>
                            <div className="card-body container-fluid">
                                <Formik enableReinitialize={true} initialValues={{
                                    sss_title: sss.sss_title,
                                    sss_desc: sss.sss_desc
                                }} validationSchema={Yup.object().shape({
                                    sss_title : Yup.string().required("S.S.S. başlığı alanı gereklidir"),
                                    sss_desc : Yup.string().required("S.S.S. açıklaması alanı gereklidir"),
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
                                                    <label>S.S.S. Başlığı</label>
                                                    <input value={values.sss_title} onChange={handleChange('sss_title')}
                                                           onBlur={handleBlur} name={"sss_title"}
                                                           className={"form-control"}/>
                                                    {(touched.sss_title && errors.sss_title) &&
                                                        <small className={"text-danger"}>{errors.sss_title}</small>}
                                                </div>
                                                <div className={"col-md-12 mt-3"}>
                                                    <label>S.S.S. Açıklaması</label>
                                                    <textarea value={values.sss_desc}
                                                              onChange={handleChange('sss_desc')} onBlur={handleBlur}
                                                              name={"sss_desc"} className={"form-control"}/>
                                                    {(touched.sss_desc && errors.sss_desc) &&
                                                        <small className={"text-danger"}>{errors.sss_desc}</small>}
                                                </div>
                                            </div>
                                            <div className={"row mt-3"}>
                                                <div className={"col-md-4"}>
                                                    <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit}
                                                            type={"button"} className={"btn btn-success btn-sm"}><i
                                                        className={"fa fa-edit"}></i> Güncelle
                                                    </button>
                                                    <Link href={"/sss/list"}
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

export default inject("AuthStore")(observer(SSSEditPage));
