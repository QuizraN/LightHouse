import { initializeApp } from "firebase/app"
import {getAuth, onAuthStateChanged,connectAuthEmulator} from "firebase/auth"


const app= initializeApp({
    apiKey: "AIzaSyBS_YsoIN8hskjeCGzZC_RtaUFA3lv-x14",
  authDomain: "intranet-for-companies.firebaseapp.com",
  projectId: "intranet-for-companies",
  storageBucket: "intranet-for-companies.appspot.com",
  messagingSenderId: "392162650213",
  appId: "1:392162650213:web:77fed62ab78ca03c1a7e8c",
  measurementId: "G-QRRVC8WDC6"
});
export const auth = getAuth(app)
// connectAuthEmulator(auth,"http://localhost:3000")
// export const db=getFirestore(app)


onAuthStateChanged(auth, user => {
    
    if(user!=null)
    {console.log("logged in",auth.currentUser); 
    
    
    }
    else{
        console.log("No User");
    }

})
