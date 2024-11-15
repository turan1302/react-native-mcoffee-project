"use client";

import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {inject, observer} from "mobx-react";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";
import AuthLayout from "@/components/common/Layout/AuthLayout";

const Header = (props) => {
    const [appState,setAppState] = useState({});

    useEffect(()=>{
        isLoggedIn();
    },[]);

    const isLoggedIn = async () => {
        props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.check, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            const result = res.data;
            if (result.isLoggedIn !== true) {
                props.AuthStore.removeToken();
            } else {
                let userData = {
                    id: result.data.id,
                    name: result.data.name,
                    surname: result.data.surname,
                    email: result.data.email,
                    access_token: result.data.access_token
                }

                let appState = {
                    "isLoggedIn": true,
                    "user": userData
                }

                props.AuthStore.saveToken(appState);
                setAppState(userData);
            }
        }).catch((err) => {
            console.log(err);
            props.AuthStore.removeToken();
        })
    }

    return (
        <AuthLayout>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                             aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                           placeholder="Search for..." aria-label="Search"
                                           aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>



                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span
                                            className="mr-2 d-none d-lg-inline text-gray-600 small">{appState.name + " " + appState.surname}</span>
                            <img className="img-profile rounded-circle"
                                 src="/assets/img/undraw_profile.svg" alt={"..."}/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                             aria-labelledby="userDropdown">
                            <Link className="dropdown-item" href={"/profile"}>
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profil Ayarları
                            </Link>
                            <Link className="dropdown-item" href={"/settings"}>
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Site Ayarları
                            </Link>
                            <Link className="dropdown-item" href="/logs">
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Log Kayıtları
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" href={"/logout"}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Çıkış Yap
                            </Link>
                        </div>
                    </li>

                </ul>

            </nav>
        </AuthLayout>
    )
}

export default inject("AuthStore")(observer(Header))
