import {firebaseDatabase} from '../utils/firebaseUtils'
import Datetime from '../utils/datetimeUtils.js';
import Finance from '../models/finance.js';

export default class FirebaseService {
    static getAccounts = (callback) => {
        let items = [];
        firebaseDatabase.collection('accounts')
            .orderBy('sort')
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    let item = doc.data();
                    item.id = doc.id;
                    items.push(item);
                });

                callback(items);
            });
    };

    static getBills = (accountId, callback) => {
        let items = [];
        let query = firebaseDatabase.collection('bills')

        if(accountId !== undefined && accountId){
            let accountReference = firebaseDatabase.collection('accounts').doc(accountId);
            query = query.where('account', '==', accountReference);
        }

        query
            .orderBy('day')
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    items.push(doc.data());
                });

                callback(items);
            });
    };

    static getEntrances = (callback) => {
        let items = [];
        firebaseDatabase.collection('entrances')
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    items.push(doc.data());
                });

                callback(items);
            });
    };

    static getTransactionsByWeek = (weekStart, accountId, callback) => {
        let week = Datetime.week(weekStart);
        let items = [];

        let query = firebaseDatabase.collection('transactions')
            .where('date', '>=', Datetime.firebaseFormat(week.start))
            .where('date', '<=', Datetime.firebaseFormat(week.end));

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
                    if(FirebaseService.validateTransaction(data)){
                        let item = doc.data();
                        item.id = doc.id;
                        item.is_fixed = false;
                        if(item.paid_date === undefined){
                            item.paid_date = null;
                        }
                        item.value = parseFloat(item.value);
                        items.push(item);
                    } else {
                        error = true;
                    }
                });
                
                callback({error: error, items: items});
            });
    };

    static validateTransaction(item){
        if(item.is_entrance === undefined) {
            console.error('is_entrance is missing', item);
            return false;
        }
        if(item.status === undefined) {
            console.error('status is missing', item);
            return false;
        }
        if(item.date === undefined) {
            console.error('date is missing', item);
            return false;
        }
        if(item.paid_date === undefined) {
            console.error('paid date is missing', item);
            return false;
        }
        if(item.name === undefined) {
            console.error('name is missing', item);
            return false;
        }
        if(item.is_entrance && item.dolar === undefined) {
            console.error('dolar is missing', item);
            return false;
        }
        if(item.is_entrance && item.worked_hours === undefined) {
            console.error('worked_hours is missing', item);
            return false;
        }
        if(!item.is_entrance && item.value === undefined) {
            console.error('value is missing', item);
            return false;
        }        
        return true;
    };

    static saveTransactions(list, callback) {
        let batch = firebaseDatabase.batch();
        for(let item of list){
            if(item.id === ''){
                continue;
            }
            let itemRef = firebaseDatabase.collection("transactions").doc(item.id);
            if(Finance.isInput(item)){

            } else {
                item.paid_date = Datetime.firebaseUnixFormat(item.paid_date);
                batch.update(itemRef, {
                    name: item.name,
                    value: item.value,
                    paid_date: item.paid_date,
                    status: item.paid_date.seconds > 0
                });
            }
        }

        batch.commit().then(function () {
            callback();
        });
    }

}