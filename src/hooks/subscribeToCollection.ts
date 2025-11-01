import { getApp } from '@react-native-firebase/app';
import {
    collection,
    getFirestore,
    onSnapshot,
    FirebaseFirestoreTypes,
    FirestoreError,
} from '@react-native-firebase/firestore';

/**
 * subscribeToCollection
 *
 * Subscribes to a Firestore collection and maps each document into type T
 * using the provided map function. Returns an unsubscribe function.
 */
export function subscribeToCollection<T>(
    collectionName: string,
    mapFn: (
        doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    ) => T,
    onUpdate: (items: T[]) => void,
    onError?: (error: FirestoreError) => void,
): () => void {
    const app = getApp();
    const db = getFirestore(app);

    const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (
            snapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
        ) => {
            const items: T[] = snapshot.docs.map(mapFn);
            onUpdate(items);
        },
        (err: FirestoreError) => {
            console.error(
                `Error listening to collection "${collectionName}":`,
                err,
            );
            if (onError) onError(err);
        },
    );

    return unsubscribe;
}
