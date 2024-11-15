"use client";

import React, {useEffect, useState} from 'react'
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import Notification from "@/RestAPI/Notification";
import {inject, observer} from "mobx-react";
import Link from "next/link";
import {date} from "@/config/date";
import Orders from "@/components/home/orders";
import Clients from "@/components/home/clients";
import Log from "@/components/home/log";

const HomePage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reports, setReports] = useState({});

    useEffect(() => {
        getReports();
    }, []);

    const getReports = async () => {
        setIsLoading(true);
        await props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.home, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            const result = res.data;
            const status = res.status;

            if (status === 200) {
                setReports(result.data);
                setIsLoading(false);
            } else {
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

    return (
        isLoading ? (
            <div>Yükleniyor...</div>
        ) : (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">mCoffee | Admin Paneli</h1>
                </div>

                <div className="row">

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Ciro (Bu Ay)
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{reports.thisMontEarn} ₺
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Ciro (Bugün)
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{reports.todayEarn} ₺
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-info text-uppercase mb-1">Toplam
                                            Üye
                                        </div>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                                <div
                                                    className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{reports.clients}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-user fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div
                                            className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Bekleyen Siparişler
                                        </div>
                                        <div
                                            className="h5 mb-0 font-weight-bold text-gray-800">{reports.pendingOrders}</div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <Orders orders={reports.lastOrders}/>
                    <Clients clients={reports.lastClients}/>
                    <Log logs={reports.lastLogs}/>
                </div>
            </>
        )
    )

}

export default inject("AuthStore")(observer(HomePage));
