"use client";

import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import {Pagination} from "react-laravel-paginex";
import Notification from "../../RestAPI/Notification";


const LogPage = (props) => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState({});

    useEffect(() => {
        getLogs();
    }, []);


    useEffect(() => {
        if (search !== "") {
            searchLogs(page, search,startDate,endDate);
        } else {
            getLogs(page);
        }
    }, [page]);

    const handleLogs = (page) => {
        setPage(page);
    }

    const getLogs = async (data = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.logs + `?page=${page}`, {
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

    const searchLogs = async (data = "", search = "", startDate = "", endDate = "") => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;
        const page = (data === "") ? 1 : data.page;

        await RestClient.getRequest(AppUrl.logs_search + `?search=${search}&startDate=${startDate}&endDate=${endDate}&page=${page}`, {
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
        setStartDate("");
        setEndDate("");
        getLogs();
    }


    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.lg_id}>
                    <td>{item.lg_id}</td>
                    <td>{item.lg_title}</td>
                    <td>{item.lg_desc}</td>
                    <td>{item.c_name + " " + item.c_surname}</td>
                    <td>{item.lg_created_at}</td>
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
                    <h1 className="h3 mb-0 text-gray-800">Sistem Logları</h1>
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <form className="form-group">
                            <div className="row align-content-center">
                                <div className="col-lg-6">
                                    <label>Log Başlığı</label>
                                    <input className="form-control" value={search}
                                           onChange={(e) => setSearch(e.target.value)}
                                           placeholder="Log Başlığı Giriniz..."/>
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
                                            onClick={() => searchLogs("", search,startDate,endDate)}><i
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
                                    <th>Log Başlık</th>
                                    <th>Log Açıklama</th>
                                    <th>Log Kullanıcı</th>
                                    <th>Log Tarih</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>Log Başlık</th>
                                    <th>Log Açıklama</th>
                                    <th>Log Kullanıcı</th>
                                    <th>Log Tarih</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                {items.data?.length > 0 ? itemRender(items) : (
                                    <tr>
                                        <td colSpan="6" className="text-center alert alert-danger">
                                            Herhangi bir kayıt bulunamadı
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                            {(items.data?.length >= 1) &&
                                <div className={"mt-3"}>
                                    <Pagination prevButtonText={"Önceki"} nextButtonText={"Sonraki"}
                                                changePage={handleLogs} data={items}/>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </>
        )
    );
};

export default inject("AuthStore")(observer(LogPage));
