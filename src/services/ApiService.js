import Datetime from '../utils/datetimeUtils.js';
import Finance from '../models/finance.js';

export default class ApiService {

    static path = 'http://finance.iuliaterra.local';

    static getAccounts = (callback) => {
        fetch(ApiService.path + "/account")
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
        fetch(ApiService.path + "/bill")
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

    static getTransactionsByMonth = (monthStart, accountId, callback) => {
        fetch(ApiService.path + "/transaction?month_start="+monthStart)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.success) {
                        let items = [];
                        for(let item of result.data){
                            item.date = Datetime.fromDatabase(item.date);
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
        /*let week = Datetime.week(weekStart);
        let items = [];

        let query = firebaseDatabase.collection('transactions')
            .where(field, '>=', Datetime.firebaseFormat(week.start))
            .where(field, '<=', Datetime.firebaseFormat(week.end));

        if(accountId){
            let accountReference = firebaseDatabase.collection('accounts').doc(accountId);
            query = query.where('account', '==', accountReference);
        }

        query
            .get()
            .then(docs => {
                let error = false;
                docs.forEach(doc => {
                    let data = doc.data();
                    let item = doc.data();
                    item.id = doc.id;
                    item.is_fixed = false;
                    if(item.paid_date === undefined){
                        item.paid_date = null;
                    }
                    let include = true;
                    if(item.paid_date){
                        if(!Datetime.isBetween(Datetime.fromFirebase(item.paid_date), week.start, week.end)){
                            include = false;
                        }
                    }
                    item.value = parseFloat(item.value);
                    if(include){
                        items.push(item);
                    }
                });

                items = Finance.sort(items);
                
                callback({error: error, items: items});
            });*/
    };

    static saveTransactions(account, list, callback) {
        /*let accountReference = firebaseDatabase.collection('accounts').doc(account);
        let batch = firebaseDatabase.batch();
        let pushRef = firebaseDatabase.collection("transactions");
        for(let item of list){
            if(item.delete !== undefined && item.delete){
                pushRef.doc(item.id).delete();
                continue;
            }
            if(item.date.length > 0){
                item.date = Datetime.toFirebase(Datetime.firebaseUnixFormat(item.date));
            }
            
            if(item.is_fixed || item.id === ''){
                let toInsert = {
                    account: accountReference,
                    name: item.name,
                    value: parseFloat(item.value),
                    paid_date: Datetime.toFirebase(item.paid_date),
                    status: item.status,
                    is_entrance: item.is_entrance,
                    date: Datetime.toFirebase(item.date)
                }
                if(Finance.isInput(item) && Finance.isSalary(item)){
                    toInsert.dolar = item.dolar;
                    toInsert.worked_hours = item.worked_hours;
                    toInsert.is_salary = true;
                }
                pushRef.add(toInsert);
            } else {
                let itemRef = firebaseDatabase.collection("transactions").doc(item.id);
                let toUpdate = {
                    account: accountReference,
                    name: item.name,
                    value: item.value,
                    paid_date: Datetime.toFirebase(item.paid_date),
                    is_entrance: item.is_entrance,
                    date: Datetime.toFirebase(item.date),
                    status: item.status,
                    is_salary: false
                };
                if(Finance.isInput(item) && Finance.isSalary(item)){
                    toUpdate.dolar = item.dolar;
                    toUpdate.worked_hours = item.worked_hours;
                    toUpdate.is_salary = true;
                }
                batch.update(itemRef, toUpdate);
            }

            
        }

        batch.commit().then(function () {
            callback();
        });*/
    }

}