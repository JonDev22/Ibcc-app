import { getApp } from '@react-native-firebase/app';
import {
    addDoc,
    collection,
    getFirestore,
} from '@react-native-firebase/firestore';

interface AddEventResponse {
    id?: string;
    status: 'success' | 'error';
    message?: string;
}
async function addItemToDatabase<T>(
    item: Omit<T, 'id'>,
    collectionId: string,
): Promise<AddEventResponse> {
    try {
        const app = getApp();
        const db = getFirestore(app);
        const ref = collection(db, collectionId);
        const docRef = await addDoc(ref, item);
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

export default addItemToDatabase;
