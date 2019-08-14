import {firebaseDatabase} from '../utils/firebaseUtils'

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

}