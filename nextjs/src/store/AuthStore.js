import {action, makeAutoObservable, observable} from "mobx";
import cryptoJS from 'crypto-js';
import {jwtDecode} from 'jwt-decode';
import sign from "jwt-encode";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";

class AuthStore{
    appState = null;

    constructor() {
        makeAutoObservable(this,{
            appState : observable,
            saveToken : action,
            getToken : action,
            removeToken : action
        })
    }

    saveToken = (appState)=>{
        try {
            localStorage.setItem("appState",cryptoJS.AES.encrypt(sign(appState,"secret"),"coffeeAdmin").toString());
            this.appState = appState;
        }catch (e) {
            console.log(e);
        }
    }

    getToken = ()=>{
        try {
            const appStateData = localStorage.getItem("appState");
            if (appStateData){
                var bytes = cryptoJS.AES.decrypt(appStateData,"coffeeAdmin");
                var orginalText = bytes.toString(cryptoJS.enc.Utf8);
                this.appState = jwtDecode(orginalText);
            }else{
                this.appState = null;
            }
        }catch (e) {
            console.log(e);
        }
    }

    removeToken=async ()=>{
        try {
            await this.logoutServer();
        }catch (e) {
            console.log(e);
        }
    }

    logoutServer = async ()=>{
        const token = (this.appState !== null) ? this.appState.user.access_token : null;

        await RestClient.getRequest(AppUrl.logout, {
            headers : {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            this.appState = null;
            location.href="/login";
        }).catch((err) => {
            console.log(err);
        })
    }
}

export default new AuthStore();
