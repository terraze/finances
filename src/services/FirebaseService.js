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

        if(accountId !== undefined && accountId !== null && accountId.length > 0){
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

    static getTransactionsByWeek = (weekStart, accountId, callback, field) => {
        let week = Datetime.week(weekStart);
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
                    if(FirebaseService.validateTransaction(data)){
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
                    } else {
                        error = true;
                    }
                });

                items = Finance.sort(items);
                
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
        if(!item.is_entrance && item.value === undefined) {
            console.error('value is missing', item);
            return false;
        }        
        return true;
    };

    static saveTransactions(account, list, callback) {
        let accountReference = firebaseDatabase.collection('accounts').doc(account);
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
        });
    }

}