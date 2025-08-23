import { getApp } from '@react-native-firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    FirebaseFirestoreTypes,
    QueryFieldFilterConstraint,
} from '@react-native-firebase/firestore';

async function getCollectionData<T>(
    colId: string,
    condition?: QueryFieldFilterConstraint,
): Promise<T[] | null> {
    const app = getApp();
    const db = getFirestore(app);
    const baseRef = collection(db, colId);
    const finalQuery = condition ? query(baseRef, condition) : baseRef;
    return getDocs(finalQuery)
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
