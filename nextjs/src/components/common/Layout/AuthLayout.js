"use client";

import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import {useRouter} from "next/navigation";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";

const AuthLayout = (props) => {
    const router = useRouter();

    useEffect(() => {
        isLoggedIn();
    }, []);

    const isLoggedIn = async () => {
        await props.AuthStore.getToken(); // token kontrolü yaptıralım
        const token = (props.AuthStore.appState !== null) ? props.AuthStore.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.check, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            const result = res.data;
            if (result.isLoggedIn !== true) {
                props.AuthStore.removeToken();
                router.push("/login");
            } else {
                let userData = {
                    id: result.data.id,
                    name: result.data.name,
                    surname: result.data.surname,
                    email: result.data.email,
                    access_token: result.data.access_token,
                }

                let appState = {
                    isLoggedIn: true,
                    user: userData
                }

                props.AuthStore.saveToken(appState);
            }
        }).catch((err) => {
            props.AuthStore.removeToken();
            router.push("/login");
        })
    }

    return (
        <>
            {props.children}
        </>
    );
}

export default inject("AuthStore")(observer(AuthLayout));
