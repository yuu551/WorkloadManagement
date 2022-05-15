import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALIKw3gisvwR3KBN2hMyfQeaDzniCh7DQ",
  authDomain: "workload-management-f0fca.firebaseapp.com",
  projectId: "workload-management-f0fca",
  storageBucket: "workload-management-f0fca.appspot.com",
  messagingSenderId: "1031787948666",
  appId: "1:1031787948666:web:bfb3093e6128eb9840e9c3",
};

// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

const auth = Firebase.auth();
const db = Firebase.firestore();
export { Firebase, auth, db };
