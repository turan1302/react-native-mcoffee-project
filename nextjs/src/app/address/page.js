"use client";

import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import {Pagination} from "react-laravel-paginex";
import "../../../public/assets/css/toggle.css";
import Notification from "../../RestAPI/Notification";
import Link from "next/link";
import {date} from "@/config/date";
import ListItem from "@/components/address/listItem";


const AddressPage = (props) => {
    const [search, setSearch] = useState("");

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState({});

    useEffect(() => {
        getAddress();
    }, []);


    useEffect(() => {
        if (search !== "") {
            searchAddress(page, search);
        } else {
            getAddress(page);
        }
    }, [page]);

    const handleAddress = (page) => {
        setPage(page);
    }

    const getAddress = async (data = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.address + `?page=${page}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {
                setItems(result.data);
                setIsLoading(false);
            }
        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Sunucu bazlı hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    };

    const searchAddress = async (data = "", search = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.address_search + `?search=${search}&page=${page}`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;
            if (status === 200) {
                setItems(result.data);
                setIsLoading(false);

            }
        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Sunucu bazlı hata oluştu. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    const resetSearch = () => {
        setSearch("");
        getAddress();
    }

    const changeDefaultStatus = async (id, user) => {
        let newItems = items.data.map((item) => {
            if (item.add_id === id && item.add_user === user) {
                return {...item, add_default: 1};
            }
            else if (item.add_user === user) {
                return {...item, add_default: 0};
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

        await RestClient.postRequest(AppUrl.address_default + `/${id}`, {}, {
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
                    })
                } else {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    })
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

    const changeCorporateStatus = async (id) => {
        let newItems = items.data.map((item, index) => {
            return (item.add_id === id) ? {...item, add_type: !item.add_type} : {...item}
        });

        items.data = newItems;

        setItems(items);
        changeCorporateStatusAPI(id);
    }

    const changeCorporateStatusAPI = async (id) => {
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.address_corporate + `/${id}`, {}, {
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
                    })
                } else {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    })
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

    const removeItem = (id) => {
        Notification.delete().then((result) => {
            if (result.isConfirmed) {
                let newItems = items.data?.filter(item => item.add_id !== id);

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

        await RestClient.postRequest(AppUrl.address_delete + `/${id}`, {}, {
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
                    })
                } else {
                    Notification.error({
                        title: result.title,
                        message: result.message
                    })
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


    return (
        isLoading ? (
            <div>Yükleniyor...</div>
        ) : (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Adresler</h1>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form className="form-group">
                            <div className="row">
                                <div className="col-lg-10">
                                    <input className="form-control" value={search}
                                           onChange={(e) => setSearch(e.target.value)}
                                           placeholder="Şehir, İlçe veya Müşteri Adı/Soyadı Giriniz..."/>
                                </div>
                                <div className="col-lg-1">
                                    <button className="btn btn-info btn-md" type={"button"}
                                            onClick={() => searchAddress("", search)}><i
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
                            <ListItem items={items} changeDefaultStatus={changeDefaultStatus} changeCorporateStatus={changeCorporateStatus} removeItem={removeItem}/>

                            {(items.data?.length >= 1) &&
                                <div className={"mt-3"}>
                                    <Pagination prevButtonText={"Önceki"} nextButtonText={"Sonraki"}
                                                changePage={handleAddress} data={items}/>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </>
        )
    );
};

export default inject("AuthStore")(observer(AddressPage));
