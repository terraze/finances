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

    static getTransactionsByWeek = (weekStart, callback) => {
        let week = Datetime.week(weekStart);
        let items = [];
        firebaseDatabase.collection('transactions')
            .where('date', '>=', Datetime.firebaseFormat(week.start))
            .where('date', '<=', Datetime.firebaseFormat(week.end))
            .get()
            .then(docs => {
            docs.forEach(doc => {
                items.push(doc.data());
            });
            callback(items);
        });
    }

}