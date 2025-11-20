import { ITbtAtHome } from '../../interfaces/ITbtAtHome';
import { getApp } from '@react-native-firebase/app';
import {
    getFirestore,
    doc,
    deleteDoc,
    collection,
} from '@react-native-firebase/firestore';
import { getStorage, ref, deleteObject } from '@react-native-firebase/storage';

async function deleteTbtAtHomeEntry(
    tbtAtHome: ITbtAtHome,
): Promise<string | null> {
    try {
        const app = getApp();
        const firestore = getFirestore(app);
        const collectionRef = collection(firestore, 'tbtAtHome');
        const storage = getStorage(app);

        // Delete the Firestore document
        const docRef = doc(collectionRef, tbtAtHome.id);

        return deleteDoc(docRef)
            .then(() => {
                const storageRef = ref(storage, tbtAtHome.resource);
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
