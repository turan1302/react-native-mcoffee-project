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

const PricesEditPage = (props) => {
    const params = useParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice] = useState({});
    const [coffees, setCoffees] = useState([]);

    useEffect(() => {
        getPrice();
    }, []);

    const getPrice = async () => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.prices_edit + `/${params.id}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {
                setPrice(result.data.price);
                setCoffees(result.data.coffees);
                setIsLoading(false);
            } else {
                if (status === 404) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    router.push("/prices/list");
                } else {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                }
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

        await RestClient.postRequest(AppUrl.prices_update+`/${params.id}`, values, {
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
                    <h1 className="h3 mb-0 text-gray-800">Yeni Kahve Fiyatı</h1>
                </div>

                <div className="row">

                    <div className="col-lg-12">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Kahve Fiyat Bilgileri</h6>
                            </div>
                            <div className="card-body container-fluid">
                                <Formik enableReinitialize={true} initialValues={{
                                    cfp_coffee: price.cfp_coffee,
                                    cfp_size: price.cfp_size,
                                    cfp_price: price.cfp_price,
                                }} validationSchema={Yup.object().shape({
                                    cfp_coffee : Yup.string().required("Kahve Adı alanı gereklidir"),
                                    cfp_size : Yup.string().required("Kahve Boyutu alanı gereklidir"),
                                    cfp_price : Yup.string().required("Kahve Fiyatı alanı gereklidir"),
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
                                                <div className={"col-md-4"}>
                                                    <label>Kahve Adı</label>
                                                    <select name={"cfp_coffee"} value={values.cfp_coffee}
                                                            onChange={handleChange}
                                                            className={"form-control"}>
                                                        {coffees.map((item, index) => (
                                                            <option key={index}
                                                                    value={item.cf_code}>{item.cf_name+" / "+item.cf_code}</option>
                                                        ))}
                                                    </select>
                                                    {(touched.cfp_coffee && errors.cfp_coffee) &&
                                                        <small className={"text-danger"}>{errors.cfp_coffee}</small>}
                                                </div>
                                                <div className={"col-md-4"}>
                                                    <label>Kahve Boyutu</label>
                                                    <input value={values.cfp_size} onChange={handleChange('cfp_size')}
                                                           onBlur={handleBlur} name={"cfp_size"} className={"form-control"}/>
                                                    {(touched.cfp_size && errors.cfp_size) &&
                                                        <small className={"text-danger"}>{errors.cfp_size}</small>}
                                                </div>
                                                <div className={"col-md-4"}>
                                                    <label>Kahve Fiyatı</label>
                                                    <input type={"number"} step={"0.01"} value={values.cfp_price} onChange={handleChange('cfp_price')}
                                                           onBlur={handleBlur} name={"cfp_price"} className={"form-control"}/>
                                                    {(touched.cfp_price && errors.cfp_price) &&
                                                        <small className={"text-danger"}>{errors.cfp_price}</small>}
                                                </div>
                                            </div>
                                            <div className={"row mt-3"}>
                                                <div className={"col-md-4"}>
                                                    <button disabled={(!isValid || isSubmitting)} onClick={handleSubmit}
                                                            type={"button"} className={"btn btn-success btn-sm"}><i
                                                        className={"fa fa-edit"}></i> Güncelle
                                                    </button>
                                                    <Link href={"/prices/list"}
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

export default inject("AuthStore")(observer(PricesEditPage));
