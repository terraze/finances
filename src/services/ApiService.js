import Datetime from '../utils/datetimeUtils.js';
import env_config from '../config.js';
import Finance from '../models/finance.js';
import Cookies from 'universal-cookie';

export default class ApiService {

    static path = env_config.api_url;

    static getAccounts = (callback) => {
        fetch(ApiService.path + "/account", {
            method: 'get',
            headers: ApiService.getHeader()
        })
            .then(res => ApiService.handleRedirect(res))
            .then(res => res.json())
            .then(                
                (result) => {
                    if (result.success) {
                        callback(result.data);
                    }
                },
                (error) => {
                    alert("Error at getAccounts");
                    console.log("getAccounts", error);
                }
            )
    };  

    static getBills = (accountId, callback) => {
        fetch(ApiService.path + "/bill",{
            method: 'get',
            headers: ApiService.getHeader()
        })
            .then(res => ApiService.handleRedirect(res))
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.success) {
                        callback(result.data);
                    }
                },
                (error) => {
                    alert("Error at getBills");
                    console.log("getBills", error);
                }
            )
    };

    static getTransactionsByMonth = (accountId, startDate, endDate, callback) => {
        startDate = Datetime.toDatabase(startDate);
        endDate = Datetime.toDatabase(endDate);
        fetch(ApiService.path + "/transaction?account="+accountId+"&startDate="+startDate+"&endDate="+endDate, {
            method: 'get',
            headers: ApiService.getHeader()
        })
            .then(res => ApiService.handleRedirect(res))
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.success) {
                        let items = [];
                        for(let item of result.data){
                            item.date = Datetime.fromDatabase(item.date);
                            item.is_entrance = !!item.is_entrance;
                            item.status = !!item.paid_date;
                            if(item.status){
                                item.paid_date = Datetime.fromDatabase(item.paid_date);
                            };
                            items.push(item);
                        }
                        callback(items);
                    }
                },
                (error) => {
                    alert("Error at getTransactionsByMonth");
                    console.log("getTransactionsByMonth", error);
                }
            )
    };

    static getTransactionsByWeek = (weekStart, accountId, callback, field) => {
        
    };

    static saveTransactions(list, callback) {
        fetch(ApiService.path + "/transaction", {
            method: "POST",
            body: JSON.stringify({data: list, token: ApiService.getToken()}),
            headers: ApiService.getHeader()
        })
        .then(res => ApiService.handleRedirect(res))
        .then(res => res.json())
        .then(
            (result) => {
                if (result.success) {
                    callback();
                }
            },
            (error) => {
                alert("Error at saveTransactions");
                console.log("saveTransactions", error);
            }
        )
    }

    static login(username, password, callback) {
        fetch(ApiService.path + "/login", {
            method: "POST",
            body: JSON.stringify({username: username, password: password})
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (result.success) {
                    ApiService.setToken(result.token);
                    callback(true);
                } else {
                    alert("Credenciais inválidas");
                    callback(false);

                }
            },
            (error) => {
                alert("Error at login");
                console.log("login", error);
            }
        )
    }

    static setToken(token){
        const cookies = new Cookies();
        cookies.set('user_token', token, { path: '/' });
    }

    static removeToken(){
        const cookies = new Cookies();
        cookies.remove('user_token', { path: '/' });
    }

    static getToken(){
        const cookies = new Cookies();
        return cookies.get('user_token');
    }

    static isAuth()
    {
        if(ApiService.getToken()){
            return true;
        }
        return false;
    }

    static getHeader()
    {
        return new Headers({
         'Authorization': 'Bearer ' + ApiService.getToken()
       })
    }

    static handleRedirect(res)
    {
        if(res.redirected){
            ApiService.removeToken();
            alert("Token inválido, redirecionando para o Login...")
            window.location.reload();
        }
        return res;
    }

}