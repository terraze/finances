import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyClgMwnePxbgqSnyU8d5t7LRD3TxFlbO6E",
    authDomain: "terrafinance-6c073.firebaseapp.com",
    databaseURL: "https://terrafinance-6c073.firebaseio.com",
    projectId: "terrafinance-6c073",
    storageBucket: "terrafinance-6c073.appspot.com",
    messagingSenderId: "101224081265",
    appId: "1:101224081265:web:5c4f1e2bbc9e1334"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.firestore(firebaseImpl);