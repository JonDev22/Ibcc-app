import { getApp } from '@react-native-firebase/app';
import {
    collection,
    getFirestore,
    doc,
    deleteDoc,
} from '@react-native-firebase/firestore';
import { IEvent } from '../interfaces/IEvent';

async function deleteEvent(event: IEvent): Promise<string> {
    try {
        const app = getApp();
        const db = getFirestore(app);
        const ref = collection(db, 'events');

        if (!event.id) {
            return 'Missing Event ID';
        }

        const docRef = doc(ref, event.id);
        return deleteDoc(docRef)
            .then(() => {
                console.log('Deleted');
                return 'success';
            })
            .catch(() => {
                return 'error';
            });
    } catch (error) {
        return String(error);
    }
}

export default deleteEvent;
