// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebaseApp from "firebase/app";
import firebase from "firebase";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
    private _googleAuthProvider: firebaseApp.auth.GithubAuthProvider;
    private _app: firebase.app.App;
    private _db: firebase.firestore.Firestore;

    constructor() {
        this._app = firebaseApp.initializeApp(firebaseConfig);
        this._googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this._db = firebase.firestore();
    }

    getGoogleAuthProvider() {
        return this._googleAuthProvider;
    }

    getApp() {
        return this._app;
    }

    getDb() {
        return this._db;
    }
}

export default Firebase;
