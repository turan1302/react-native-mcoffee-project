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


const ClientsSettingsPage = (props) => {
    const [search, setSearch] = useState("");

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState({});

    useEffect(() => {
        getClientSettings();
    }, []);


    useEffect(() => {
        if (search !== "") {
            searchClientSettings(page, search);
        } else {
            getClientSettings(page);
        }
    }, [page]);

    const handleClientSettings = (page) => {
        setPage(page);
    }

    const getClientSettings = async (data = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.client_settings + `?page=${page}`, {
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

    const searchClientSettings = async (data = "", search = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.client_settings_search + `?search=${search}&page=${page}`, {
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
        getClientSettings();
    }

    const changeNotifyStatus = async (id) => {
        let newItems = items.data.map((item, index) => {
            return (item.cs_id === id) ? {...item, cs_notify: !item.cs_notify} : {...item}
        });

        items.data = newItems;

        setItems(items);
        changeNotifyStatusAPI(id);
    }

    const changeNotifyStatusAPI = async (id) => {
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.client_settings_notify_status + `/${id}`, {}, {
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


    const changeEmailStatus = async (id) => {
        let newItems = items.data.map((item, index) => {
            return (item.cs_id === id) ? {...item, cs_email: !item.cs_email} : {...item}
        });

        items.data = newItems;

        setItems(items);
        changeEmailStatusAPI(id);
    }

    const changeEmailStatusAPI = async (id) => {
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.client_settings_email_status + `/${id}`, {}, {
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

    const changeSmsStatus = async (id) => {
        let newItems = items.data.map((item, index) => {
            return (item.cs_id === id) ? {...item, cs_sms: !item.cs_sms} : {...item}
        });

        items.data = newItems;

        setItems(items);
        changeSmsStatusAPI(id);
    }

    const changeSmsStatusAPI = async (id) => {
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.postRequest(AppUrl.client_settings_sms_status + `/${id}`, {}, {
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
                let newItems = items.data?.filter(item => item.cs_id !== id);

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

        await RestClient.postRequest(AppUrl.client_settings_delete + `/${id}`, {}, {
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
                });
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

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.cs_id}>
                    <td>{item.cs_id}</td>
                    <td>{item.c_name + " " + item.c_surname}</td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cs_notify} onChange={() => changeNotifyStatus(item.cs_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cs_email} onChange={() => changeEmailStatus(item.cs_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cs_sms} onChange={() => changeSmsStatus(item.cs_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>{date(item.cs_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.cs_id)} className={"btn btn-danger btn-sm"}><i
                            className={"fa fa-times"}></i> Sil
                        </button>
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
                    <h1 className="h3 mb-0 text-gray-800">Kullanıcı Ayarları</h1>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form className="form-group">
                            <div className="row">
                                <div className="col-lg-10">
                                    <input className="form-control" value={search}
                                           onChange={(e) => setSearch(e.target.value)}
                                           placeholder="Müşteri Adı/Soyadı Giriniz..."/>
                                </div>
                                <div className="col-lg-1">
                                    <button className="btn btn-info btn-md" type={"button"}
                                            onClick={() => searchClientSettings("", search)}><i
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
                            <table className="table table-bordered" width="100%" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Müşteri Adı</th>
                                    <th>Bildirim İzin</th>
                                    <th>E-Mail İzin</th>
                                    <th>SMS İzin</th>
                                    <th>Eklenme Tarihi</th>
                                    <th>İşlemler</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Müşteri Adı</th>
                                    <th>Bildirim İzin</th>
                                    <th>E-Mail İzin</th>
                                    <th>SMS İzin</th>
                                    <th>Eklenme Tarihi</th>
                                    <th>İşlemler</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                {items.data?.length > 0 ? itemRender(items) : (
                                    <tr>
                                        <td colSpan="12" className="text-center alert alert-danger">
                                            Herhangi bir kayıt bulunamadı
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            {(items.data?.length >= 1) &&
                                <div className={"mt-3"}>
                                    <Pagination prevButtonText={"Önceki"} nextButtonText={"Sonraki"}
                                                changePage={handleClientSettings} data={items}/>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </>
        )
    );
};

export default inject("AuthStore")(observer(ClientsSettingsPage));
