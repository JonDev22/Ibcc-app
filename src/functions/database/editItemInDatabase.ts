import { getApp } from '@react-native-firebase/app';
import {
    doc,
    collection,
    getFirestore,
    updateDoc,
    UpdateData,
} from '@react-native-firebase/firestore';

interface EditEventResponse {
    id?: string;
    status: 'success' | 'error';
    message?: string;
}
async function editItemInDatabase<T extends { id: string }>(
    item: T,
    collectionId: string,
): Promise<EditEventResponse> {
    try {
        const app = getApp();
        const db = getFirestore(app);

        const ref = collection(db, collectionId);
        const docRef = doc(ref, item.id);

        const { id, ...data } = item;

        return updateDoc(docRef, data as UpdateData<T>)
            .then(() => {
                return {
                    id: id,
                    status: 'success',
                } as EditEventResponse;
            })
            .catch(() => {
                return {
                    status: 'error',
                    message: 'Could not add event',
                };
            });
    } catch (error) {
        return { status: 'error', message: String(error) };
    }
}

export default editItemInDatabase;
