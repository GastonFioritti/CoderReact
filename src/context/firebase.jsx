import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQc0_VX0-R3Zy5FY5z0cmc1sJfs8XTiPs',
  authDomain: 'ecommerce-coder-6f2ad.firebaseapp.com',
  projectId: 'ecommerce-coder-6f2ad',
  storageBucket: 'ecommerce-coder-6f2ad.appspot.com',
  messagingSenderId: '163860915147',
  appId: '1:163860915147:web:5a46bc63ba801832f98c4e',
  measurementId: 'G-BLVJL5FRCB'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, analytics, db };