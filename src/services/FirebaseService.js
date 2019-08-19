import {firebaseDatabase} from '../utils/firebaseUtils'
import Datetime from '../utils/datetimeUtils.js';

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {
        let items = [];
        firebaseDatabase.collection(nodePath)
            .orderBy("day").get()
            .then(docs => {
            docs.forEach(doc => {
                items.push(doc.data());
            });
            callback(items);
        });
    };

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    static getAccounts = (callback) => {
        let items = [];
        firebaseDatabase.collection('accounts')
            .orderBy('sort')
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    items.push(doc.data());
                });

                callback(items);
            });
    }

    static getBills = (callback) => {
        let items = [];
        firebaseDatabase.collection('bills')
            .orderBy('day')
            .get()
            .then(docs => {
                docs.forEach(doc => {
                    items.push(doc.data());
                });

                callback(items);
            });
    }

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
    }

    static getTransactionsByWeek = (weekStart, callback) => {
        let week = Datetime.week(weekStart);
        let items = [];
        firebaseDatabase.collection('transactions')
            .where('date', '>=', Datetime.firebaseFormat(week.start))
            .where('date', '<=', Datetime.firebaseFormat(week.end))
            .get()
            .then(docs => {
                let error = false;
                docs.forEach(doc => {
                    let data = doc.data()
                    if(FirebaseService.validateTransaction(data)){
                        items.push(data);
                    } else {
                        error = true;
                    }
                });
                
                callback({error: error, items: items});
            });
    }

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
    }

}