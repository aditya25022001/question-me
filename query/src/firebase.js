import dotenv from 'dotenv'

import firebase from 'firebase'

dotenv.config()

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDLmFzuy9udVHjmAnIzFWnWKFtqt7FldGw",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "clone-fb-dd07f",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { auth, db }