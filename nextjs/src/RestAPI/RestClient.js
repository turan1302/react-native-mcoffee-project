import axios from "axios";

class RestClient{
    static getRequest = (url,config = {})=>{
        return axios.get(url,{
            "Content-Type" : "application/json",
            ...config
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err.response;
        })
    }

    static postRequest = (postUrl,postData,config={})=>{
        return axios.post(postUrl,postData,{
            "Content-Type" : "application/json",
            ...config
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err.response;
        })
    }
}

export default RestClient;
