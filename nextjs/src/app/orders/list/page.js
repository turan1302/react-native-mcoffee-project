"use client";

import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import {Pagination} from "react-laravel-paginex";
import Notification from "../../../RestAPI/Notification";
import Link from "next/link";
import {date} from "@/config/date";


const OrdersPage = (props) => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState({});

    useEffect(() => {
        getOrders();
    }, []);


    useEffect(() => {
        if (search !== "") {
            searchOrders(page, search,startDate,endDate);
        } else {
            getOrders(page);
        }
    }, [page]);

    const handleOrders = (page) => {
        setPage(page);
    }

    const getOrders = async (data = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.orders + `?page=${page}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;
            if (status === 200) {
                setItems(result.data);
                setIsLoading(false);
            }else{
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
    };

    const searchOrders = async (data = "", search = "", startDate = "", endDate = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.orders_search + `?search=${search}&startDate=${startDate}&endDate=${endDate}&page=${page}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;
            if (status === 200) {
                setItems(result.data);
                setIsLoading(false);
            }else{
                Notification.error({
                    title: "Hata",
                    message: "Sunucu bazlı hata oluştu. Lütfen daha sonra tekrar deneyiniz"
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

    const resetSearch = () => {
        setSearch("");
        getOrders();
    }


    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.ord_id}>
                    <td>{item.ord_id}</td>
                    <td>
                        <Link href={`/orders/bills/${item.ord_no}`}>
                            {item.ord_no}
                        </Link>
                    </td>
                    <td>{item.c_name+" "+item.c_surname}</td>
                    <td>{item.ord_company}</td>
                    <td>{item.ord_company_vd}</td>
                    <td>{item.ord_company_vd_no}</td>
                    <td>{item.ord_name+" "+item.ord_surname}</td>
                    <td>{item.ord_email}</td>
                    <td>{item.payment_type}</td>
                    <td>{item.payment_status}</td>
                    <td>{item.delivery_status}</td>
                    <td>{date(item.ord_z_date)}</td>
                    <td>{item.ord_ip}</td>
                    <td colSpan={2}>
                        <Link href={`/orders/bills/${item.ord_no}`} className={"btn btn-warning btn-sm"}><i
                            className={"fa fa-list"}></i> Detay
                        </Link>
                    </td>
                </tr>
            );
        });
    };

    return (
        isLoading ? (
            <div>Yükleniyor...</div>
        ) : (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Siparişler</h1>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form className="form-group">
                            <div className="row align-content-center">
                                <div className="col-lg-6">
                                    <label>Sipariş Kodu</label>
                                    <input className="form-control" value={search}
                                           onChange={(e) => setSearch(e.target.value)}
                                           placeholder="Sipariş Kodu Giriniz..."/>
                                </div>
                                <div className="col-lg-2">
                                    <label>Başlangıç Tarihi</label>
                                    <input type={"date"} className="form-control" value={startDate}
                                           onChange={(e) => setStartDate(e.target.value)}/>
                                </div>
                                <div className="col-lg-2">
                                    <label>Bitiş Tarihi</label>
                                    <input type={"date"} className="form-control" value={endDate}
                                           onChange={(e) => setEndDate(e.target.value)}/>
                                </div>
                                <div className="col-lg-1 mt-4">
                                    <button className="btn btn-info btn-md" type={"button"}
                                            onClick={() => searchOrders("", search, startDate, endDate)}><i
                                        className="fa fa-search"></i> Filtrele
                                    </button>
                                </div>
                                <div className="col-lg-1 mt-4">
                                    <button className="btn btn-danger btn-md" type={"button"} onClick={resetSearch}><i
                                        className="fa fa-times"></i> Sıfırla
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Sipariş Kodu</th>
                                    <th>Müşteri</th>
                                    <th>Şirket</th>
                                    <th>Vergi Daire</th>
                                    <th>Vergi No</th>
                                    <th>Ad Soyad</th>
                                    <th>E-Mail</th>
                                    <th>Sipariş Tipi</th>
                                    <th>Ödeme Durum</th>
                                    <th>Sipariş Durum</th>
                                    <th>Sipariş Tarih</th>
                                    <th>Sipariş IP</th>
                                    <th>İşlemler</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Sipariş Kodu</th>
                                    <th>Müşteri</th>
                                    <th>Şirket</th>
                                    <th>Vergi Daire</th>
                                    <th>Vergi No</th>
                                    <th>Ad Soyad</th>
                                    <th>E-Mail</th>
                                    <th>Sipariş Tipi</th>
                                    <th>Ödeme Durum</th>
                                    <th>Sipariş Durum</th>
                                    <th>Sipariş Tarih</th>
                                    <th>Sipariş IP</th>
                                    <th>İşlemler</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                {items.data?.length > 0 ? itemRender(items) : (
                                    <tr>
                                        <td colSpan="15" className="text-center alert alert-danger">
                                            Herhangi bir kayıt bulunamadı
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            {(items.data?.length >= 1) &&
                                <div className={"mt-3"}>
                                    <Pagination prevButtonText={"Önceki"} nextButtonText={"Sonraki"}
                                                changePage={handleOrders} data={items}/>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </>
        )
    );
};

export default inject("AuthStore")(observer(OrdersPage));
