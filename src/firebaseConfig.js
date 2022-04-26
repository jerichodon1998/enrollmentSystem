// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD-4AdLpUjgs-_MX8CevxGF6i0_u4nH110",
	authDomain: "enrollment-system-52b34.firebaseapp.com",
	projectId: "enrollment-system-52b34",
	storageBucket: "enrollment-system-52b34.appspot.com",
	messagingSenderId: "849560912077",
	appId: "1:849560912077:web:d2d0ac6b2edc99bc8b6984",
	measurementId: "G-WPJ6LTLEMQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
