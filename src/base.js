import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAAy9sCZqbrOxGM1F4wa12JhKFOc05vvSs",
    authDomain: "catch-of-the-day-mileta.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-mileta.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;