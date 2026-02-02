import { getApp } from '@react-native-firebase/app';
import {
    getFirestore,
    doc,
    deleteDoc,
    collection,
} from '@react-native-firebase/firestore';
import { getStorage, ref, deleteObject } from '@react-native-firebase/storage';

async function deleteTbtAtHomeEntry(
    id: string,
    resource: string,
    colId: string,
): Promise<string | null> {
    try {
        const app = getApp();
        const firestore = getFirestore(app);
        const collectionRef = collection(firestore, colId);
        const storage = getStorage(app);

        // Delete the Firestore document
        const docRef = doc(collectionRef, id);

        return deleteDoc(docRef)
            .then(async () => {
                const storageRef = ref(storage, resource);
                return deleteObject(storageRef)
                    .then(() => {
                        return 'success';
                    })
                    .catch(error => {
                        console.error('Error removing document: ', error);
                        return null;
                    });
            })
            .catch(error => {
                console.error('Error removing document: ', error);
                return null;
            });
    } catch (error) {
        console.error('Error in deleteTbtAtHomeEntry:', error);
        return null;
    }
}

export default deleteTbtAtHomeEntry;
