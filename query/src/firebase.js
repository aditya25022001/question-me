import dotenv from 'dotenv'

import firebase from 'firebase'

dotenv.config()

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { auth, db }