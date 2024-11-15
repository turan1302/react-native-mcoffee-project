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

const BillsPage = (props) => {
    const params = useParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [bill, setBill] = useState({});
    const [order, setOrder] = useState({});
    const [orderProducts, setOrderProducts] = useState({});
    const [settings, setSettings] = useState({});


    useEffect(() => {
        getBills();
    }, []);

    const getBills = async () => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.orders_bills + `/${params.code}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;
            if (status === 200) {
                setBill(result.data.bills);
                setOrder(result.data.order);
                setOrderProducts(result.data.order_products);
                setSettings(result.data.settings);
                setIsLoading(false);
            } else {
                if (status === 404) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    router.push("/orders/list");
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

        await RestClient.postRequest(AppUrl.orders_update + `/${params.code}`, values, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "multipart/form-data"
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
                setTimeout(() => {
                    location.reload();
                }, 800);
            } else {
                Notification.error({
                    title: result.title,
                    message: result.message
                });
                setSubmitting(false);
                props.AuthStore.removeToken();
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

    const itemRender = (items) => {
        return items.map((item, index) => {
            return (
                <tr key={item.orp_id}>
                    <td>{item.orp_coffee}</td>
                    <td>{item.cf_name}</td>
                    <td>{item.sugar_status}</td>
                    <td>{item.orp_size}</td>
                    <td>{item.orp_qty}</td>
                    <td>{item.orp_price} ₺</td>
                    <td>{item.orp_total_price} ₺</td>
                </tr>
            )
        })
    }

    return (
        isLoading ? (
            <div>Yükleniyor...</div>
        ) : (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Sipariş Fatura</h1>
                </div>

                <div className="row">

                    <div className="col-lg-12">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Sipariş Bilgileri</h6>
                            </div>
                            <div className="card-body container-fluid">
                                <div className={"row justify-content-between"}>
                                    <div className={"col-md-8"}>
                                        <p>
                                            <b>Gönderici: {settings.set_title}</b>
                                        </p>
                                        <b>Alıcı Bilgileri</b>
                                        <div className={"mt-2"}>
                                            Ad Soyad: {bill.bl_name + " " + bill.bl_surname}
                                            <br/>
                                            Şehir: {bill.bl_district + "/" + bill.bl_city}
                                            <br/>
                                            E-Mail: {bill.bl_email}

                                        </div>
                                    </div>
                                    <div className={"col-md-4"}>
                                        <div className={"d-flex justify-content-end"}>
                                            <b>Fatura No: #{bill.bl_order}</b>
                                        </div>
                                        <div className={"d-flex justify-content-end text-right"}>
                                            Tarih: {order.ord_z_date}
                                            <br/>
                                            Teslimat Durum: {order.delivery_status}
                                        </div>

                                        <div className={"mt-3"}>
                                            Ödeme Detayları
                                            <div className={"mt-3"}>
                                                <div className={"d-flex justify-content-between"}>
                                                    <span>Toplam Tutar:</span>
                                                    <span>{bill.bl_total_price} ₺</span>
                                                </div>
                                                {(bill.bl_type === "1") && (
                                                    <>
                                                        <div className={"d-flex justify-content-between"}>
                                                            <span>Adres Başlığı:</span>
                                                            <span>{bill.bl_company}</span>
                                                        </div>

                                                        <div className={"d-flex justify-content-between"}>
                                                            <span>Vergi Dairesi:</span>
                                                            <span>{bill.bl_company_vd}</span>
                                                        </div>

                                                        <div className={"d-flex justify-content-between"}>
                                                            <span>Vergi No:</span>
                                                            <span>{bill.bl_company_vd_no}</span>
                                                        </div>
                                                    </>
                                                )}

                                                {(bill.bl_type === "1") && (
                                                    <>
                                                        <div className={"d-flex justify-content-between mt-5"}>
                                                            <span>Adres:</span>
                                                            <span>{bill.bl_address}</span>
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                    {(order.ord_note !== "") && (
                                        <div className={"col-md-6 mt-2"}>
                                            <b>Sipariş Notu:</b>
                                            <br/>
                                            <label>{order.ord_note}</label>
                                        </div>
                                    )}

                                    <div className={"col-md-12"}>
                                        <Formik enableReinitialize={true} initialValues={{
                                            ord_status: order.ord_status,
                                            ord_delivery_status: order.ord_delivery_status,
                                        }} validationSchema={Yup.object().shape({
                                            ord_status: Yup.string().required("Ödenme durum alanı gereklidir"),
                                            ord_delivery_status: Yup.string().required("Teslimat durum alanı gereklidir"),
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
                                                        <div className={"col-md-4"}>
                                                            <label>Ödenme Durum</label>
                                                            <select name={"ord_status"} value={values.ord_status}
                                                                    onChange={handleChange}
                                                                    className={"form-control"}>
                                                                <option value={"0"}>Bekliyor</option>
                                                                <option value={"1"}>Ödendi</option>
                                                                <option value={"2"}>İptal Edildi</option>
                                                            </select>
                                                            {(touched.ord_status && errors.ord_status) &&
                                                                <small
                                                                    className={"text-danger"}>{errors.ord_status}</small>}
                                                        </div>

                                                        <div className={"col-md-4"}>
                                                            <label>Teslimat Durum</label>
                                                            <select name={"ord_delivery_status"}
                                                                    value={values.ord_delivery_status}
                                                                    onChange={handleChange}
                                                                    className={"form-control"}>
                                                                <option value={"0"}>Bekliyor</option>
                                                                <option value={"1"}>Teslim Edildi</option>
                                                                <option value={"2"}>İade Edildi</option>
                                                            </select>
                                                            {(touched.ord_delivery_status && errors.ord_delivery_status) &&
                                                                <small
                                                                    className={"text-danger"}>{errors.ord_delivery_status}</small>}
                                                        </div>
                                                    </div>
                                                    <div className={"row mt-3"}>
                                                        <div className={"col-md-4"}>
                                                            <button disabled={(!isValid || isSubmitting)}
                                                                    onClick={handleSubmit}
                                                                    type={"button"}
                                                                    className={"btn btn-success btn-sm"}><i
                                                                className={"fa fa-edit"}></i> Güncelle
                                                            </button>
                                                            <Link href={"/orders/list"} className={"btn btn-danger btn-sm ml-3"}>
                                                                <i className={"fa fa-arrow-left"}></i> Geriye Dön
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </div>

                                    <div className="table-responsive mt-3">
                                        <table className="table table-bordered" width="100%" cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th>Kahve Kodu</th>
                                                <th>Kahve Adı</th>
                                                <th>Şeker Oranı</th>
                                                <th>Boyut</th>
                                                <th>Adet</th>
                                                <th>Birim Fiyat</th>
                                                <th>Toplam Tutar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orderProducts.length > 0 ? itemRender(orderProducts) : (
                                                <tr>
                                                    <td colSpan="15" className="text-center alert alert-danger">
                                                        Herhangi bir kayıt bulunamadı
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>


                                    <div className={"col-md-4 offset-md-8"}>
                                        <div className={"d-flex flex-column align-items-end"}>
                                            <span>Ara Toplam: {bill.bl_price} ₺</span>
                                            <span>KDV: {bill.bl_kdv} %</span>
                                            {(bill.bl_courier_price !== null) && (
                                                <span>Kurye Ücreti: {bill.bl_courier_price} ₺</span>)}
                                            <span>Toplam: {bill.bl_total_price} ₺</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    )
}

export default inject("AuthStore")(observer(BillsPage));
