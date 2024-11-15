"use client";

import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import {Pagination} from "react-laravel-paginex";
import Notification from "../../RestAPI/Notification";
import {date} from "@/config/date";
import ListItem from "@/components/favourites/listItem";


const FavouritePage = (props) => {
    const [search, setSearch] = useState("");

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState({});

    useEffect(() => {
        getFavourites();
    }, []);


    useEffect(() => {
        if (search !== "") {
            searchFavourites(page, search);
        } else {
            getFavourites(page);
        }
    }, [page]);

    const handleFavourites = (page) => {
        setPage(page);
    }

    const getFavourites = async (data = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.favourites + `?page=${page}`, {
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

    const searchFavourites = async (data = "", search = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.favourites_search + `?search=${search}&page=${page}`, {
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
        getFavourites();
    }

    const removeItem = (id) => {
        Notification.delete().then((result) => {
            if (result.isConfirmed) {
                let newItems = items.data?.filter(item => item.fv_id !== id);

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

        await RestClient.postRequest(AppUrl.favourites_delete + `/${id}`, {}, {
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
                    <h1 className="h3 mb-0 text-gray-800">Favoriler</h1>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form className="form-group">
                            <div className="row align-content-center">
                                <div className="col-lg-10">
                                    <input className="form-control" value={search}
                                           onChange={(e) => setSearch(e.target.value)}
                                           placeholder="Kahve Adı veya Kahve Kodu Giriniz..."/>
                                </div>
                                <div className="col-lg-1">
                                    <button className="btn btn-info btn-md" type={"button"}
                                            onClick={() => searchFavourites("", search)}><i
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
                           <ListItem items={items} removeItem={removeItem}/>

                            {(items.data?.length >= 1) &&
                                <div className={"mt-3"}>
                                    <Pagination prevButtonText={"Önceki"} nextButtonText={"Sonraki"}
                                                changePage={handleFavourites} data={items}/>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </>
        )
    );
};

export default inject("AuthStore")(observer(FavouritePage));
