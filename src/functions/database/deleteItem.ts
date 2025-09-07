import { getApp } from '@react-native-firebase/app';
import {
    collection,
    getFirestore,
    doc,
    deleteDoc,
} from '@react-native-firebase/firestore';

interface HasId {
    id: string;
}

async function deleteItem<T extends HasId>(
    item: T,
    collectionId: string,
): Promise<string> {
    try {
        const app = getApp();
        const db = getFirestore(app);
        const ref = collection(db, collectionId);

        if (!item.id) {
            return 'Missing Event ID';
        }

        const docRef = doc(ref, item.id);
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

export default deleteItem;
