"use client";

import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import {Pagination} from "react-laravel-paginex";
import "../../../../public/assets/css/toggle.css";
import Notification from "../../../RestAPI/Notification";
import Link from "next/link";
import {date} from "@/config/date";
import ListItem from "@/components/prices/listItem";


const PricesListPage = (props) => {
    const [search, setSearch] = useState("");

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState({});

    useEffect(() => {
        getPrices();
    }, []);


    useEffect(() => {
        if (search !== "") {
            searchPrices(page, search);
        } else {
            getPrices(page);
        }
    }, [page]);

    const handlePrices = (page) => {
        setPage(page);
    }

    const getPrices = async (data = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.prices + `?page=${page}`, {
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

    const searchPrices = async (data = "", search = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.prices_search + `?search=${search}&page=${page}`, {
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
    }

    const resetSearch = () => {
        setSearch("");
        getPrices();
    }

    const changeStatus = (id) => {
        let newItems = items.data.map((item, index) => {
            return (item.cfp_id === id) ? {...item, cfp_status: !item.cfp_status} : {...item}
        });

        items.data = newItems;
        setItems(items);
        changeStatusAPI(id);
    }

    const changeStatusAPI = async (id) => {
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.prices_status + `/${id}`, {}, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {

            } else {
                if (status === 404) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    props.AuthStore.removeToken();
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

    const changeDefaultStatus = async (id, coffee) => {
        let newItems = items.data.map((item, index) => {
            if (item.cfp_id === id && item.cfp_coffee === coffee) {
                return {...item, cfp_default: 1};
            } else if (item.cfp_coffee === coffee) {
                return {...item, cfp_default: 0};
            }
            return item;
        });

        items.data = newItems;
        await setItems([]);
        await setItems(items);
        changeDefaultStatusAPI(id);
    }

    const changeDefaultStatusAPI = async (id) => {
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.prices_default + `/${id}`, {}, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {

            } else {
                if (status === 404) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    props.AuthStore.removeToken();
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

    const removeItem = (id) => {
        Notification.delete().then((result) => {
            if (result.isConfirmed) {
                let newItems = items.data?.filter(item => item.cfp_id !== id);

                items.data = newItems;

                setItems(prevItems => ({
                    ...prevItems,
                    items
                }));

                removeItemAPI(id);
            }
        });
    }

    const removeItemAPI = async (id) => {
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.prices_delete + `/${id}`, {}, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {
                Notification.success({
                    title: result.title,
                    message: result.message
                })
            } else {
                if (status === 404) {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    });
                    props.AuthStore.removeToken();
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

    return (
        isLoading ? (
            <div>Yükleniyor...</div>
        ) : (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Fiyatlar</h1>
                    <Link href={"/prices/create"}
                          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-plus"></i> Yeni Ekle</Link>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form className="form-group">
                            <div className="row">
                                <div className="col-lg-10">
                                    <input className="form-control" value={search}
                                           onChange={(e) => setSearch(e.target.value)}
                                           placeholder="Kahve Adı veya Kod Giriniz..."/>
                                </div>
                                <div className="col-lg-1">
                                    <button className="btn btn-info btn-md" type={"button"}
                                            onClick={() => searchPrices("", search)}><i
                                        className="fa fa-search"></i> Filtrele
                                    </button>
                                </div>
                                <div className="col-lg-1">
                                    <button className="btn btn-danger btn-md" type={"button"} onClick={resetSearch}><i
                                        className="fa fa-times"></i> Sıfırla
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                           <ListItem items={items} changeStatus={changeStatus} changeDefaultStatus={changeDefaultStatus} removeItem={removeItem}/>

                            {(items.data?.length >= 1) &&
                                <div className={"mt-3"}>
                                    <Pagination prevButtonText={"Önceki"} nextButtonText={"Sonraki"}
                                                changePage={handlePrices} data={items}/>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </>
        )
    );
};

export default inject("AuthStore")(observer(PricesListPage));
