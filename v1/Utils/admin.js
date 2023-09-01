import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mickiefitness-default-rtdb.firebaseio.com"
});

export const db = admin.firestore();
export const firebaseAuth = admin.auth();

