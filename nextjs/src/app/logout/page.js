"use client";

import React, {useEffect} from 'react'
import {inject,observer} from "mobx-react";
import {useRouter} from "next/navigation";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";

const LogoutPage = (props) => {

    const router = useRouter();

    useEffect(() => {
        doLogout();
    }, []);

    const doLogout = async ()=>{
        props.AuthStore.getToken();
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.logout, {
            headers : {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            props.AuthStore.removeToken();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>

        </>
    )
}

export default inject("AuthStore")(observer(LogoutPage));
