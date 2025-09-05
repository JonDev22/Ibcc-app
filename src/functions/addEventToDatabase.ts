import { getApp } from '@react-native-firebase/app';
import {
    addDoc,
    collection,
    getFirestore,
} from '@react-native-firebase/firestore';
import { IEvent } from '../interfaces/IEvent';

function addEventToDatabase(event: IEvent) {
    try {
        const app = getApp();
        const db = getFirestore(app);
        const ref = collection(db, 'events');
        const docRef = addDoc(ref, event);
        return docRef;
    } catch (error) {
        return -1;
    }
}

export default addEventToDatabase;
