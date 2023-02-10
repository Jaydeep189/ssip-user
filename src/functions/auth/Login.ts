import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default async function Login(uid: string, name: string, phoneNumber: string) {
	try {
		const docRef = await addDoc(collection(db, 'User'), {
			name: name,
			phoneNumber: phoneNumber,
			uid: uid
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
}
