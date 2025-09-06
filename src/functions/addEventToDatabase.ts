import { getApp } from '@react-native-firebase/app';
import {
    addDoc,
    collection,
    getFirestore,
} from '@react-native-firebase/firestore';
import { IEvent } from '../interfaces/IEvent';

interface AddEventResponse {
    id?: string;
    status: 'success' | 'error';
    message?: string;
}

async function addEventToDatabase(
    event: Omit<IEvent, 'id'>,
): Promise<AddEventResponse> {
    try {
        const app = getApp();
        const db = getFirestore(app);
        const ref = collection(db, 'events');
        const docRef = await addDoc(ref, event);
        if (docRef) {
            return {
                id: docRef.id,
                status: 'success',
            };
        }
        return {
            status: 'error',
            message: 'Could not add event',
        };
    } catch (error) {
        return { status: 'error', message: String(error) };
    }
}

export default addEventToDatabase;
