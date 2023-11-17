import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; 

const addOrderToFirestore = async (orderDetails) => {
  try {
    const ordersCollection = collection(db, 'orders');
    const newOrderRef = await addDoc(ordersCollection, orderDetails);
    console.log('Orden agregada con ID:', newOrderRef.id);
    return newOrderRef.id; 
  } catch (error) {
    console.error('Error al agregar la orden a Firestore:', error);
    throw error;
  }
};

export { addOrderToFirestore };