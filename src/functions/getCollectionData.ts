import { getApp } from '@react-native-firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

async function getCollectionData<T>(colId: string): Promise<T[] | null> {
    const app = getApp();
    const db = getFirestore(app);
    const colRef = collection(db, colId);
    return getDocs(colRef)
        .then((res: FirebaseFirestoreTypes.QuerySnapshot) => {
            return res.docs.map(
                doc =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    } as T),
            );
        })
        .catch(() => {
            return null;
        });
}

export default getCollectionData;
