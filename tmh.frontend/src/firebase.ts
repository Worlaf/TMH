// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebaseApp from "firebase/app";
import firebase from "firebase";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import appConfig from "./utils/appConfig";

class Firebase {
    private _googleAuthProvider: firebaseApp.auth.GithubAuthProvider;
    private _app: firebase.app.App;
    private _db: firebase.firestore.Firestore;

    constructor() {
        this._app = firebaseApp.initializeApp(appConfig.firebaseConfig);
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
