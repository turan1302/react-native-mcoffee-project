import { action, computed, makeAutoObservable, observable } from "mobx";
import cryptoJS from "react-native-crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationService from "../NavigationService";
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppUrl";

class AuthStore {
  appState = null;

  constructor() {
    makeAutoObservable(this, {
      appState: observable,
      saveToken: action,
      getToken: action,
      getAccessToken: action,
      removeToken: action,
      redirectControl: action,
      tokenControl: action,
    });
  }

  saveToken = async (appState) => {
    try {
      const encryptedState = cryptoJS.AES.encrypt(JSON.stringify(appState), "coffee").toString();
      await AsyncStorage.setItem("appState", encryptedState);
      this.appState = appState;
    } catch (e) {
      console.log("Error saving token:", e);
    }
  };

  getAccessToken = async () => {
    try {
      const appStateData = await AsyncStorage.getItem("appState");

      if (appStateData) {
        const bytes = cryptoJS.AES.decrypt(appStateData, "coffee");
        const originalText = bytes.toString(cryptoJS.enc.Utf8);
        this.appState = JSON.parse(originalText);
      } else {
        this.appState = null;
      }
    } catch (e) {
      console.log("Error retrieving access token:", e);
    }
  };

  getToken = async () => {
    try {
      await this.getAccessToken();
      this.redirectControl();
    } catch (e) {
      console.log("Error getting token:", e);
    }
  };

  removeToken = async () => {
    try {
      await this.logoutServer();
      await AsyncStorage.removeItem("appState");
      this.appState = null;
      this.redirectControl();
    } catch (e) {
      console.log("Error removing token:", e);
    }
  };

  logoutServer = async () => {
    try {
      await this.getAccessToken();
      const token = this.appState?.user?.access_token;

      await RestClient.getRequest(AppUrl.logout, {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
    } catch (err) {
      console.log("Token control error:", err);
      return false;
    }
  };

  redirectControl = () => {
    if (!this.appState) {
      NavigationService.navigate("Login");
      return false;
    } else {
      this.tokenControl().then((result) => {
        if (result) {
          NavigationService.navigate("Welcome");
        }
      });
    }
  };

  tokenControl = async () => {
    try {
      await this.getAccessToken();
      const token = this.appState?.user?.access_token;

      if (!token) {
        await this.removeToken();
        return false;
      }

      const res = await RestClient.getRequest(AppUrl.check, {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });

      const result = res.data;
      if (result.isLoggedIn !== true) {
        await this.removeToken();
        return false;
      } else {
        let userData = {
          id: result.data.id,
          c_name: result.data.c_name,
          c_surname: result.data.c_surname,
          email: result.data.email,
          access_token: result.data.access_token,
        };

        let appState = {
          isLoggedIn: true,
          user: userData,
        };

        await this.saveToken(appState);
        return true;
      }
    } catch (err) {
      console.log("Token control error:", err);
      await this.removeToken();
      return false;
    }
  };
}

export default new AuthStore();
