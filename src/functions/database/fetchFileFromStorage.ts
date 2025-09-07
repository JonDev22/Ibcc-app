import { getApp } from '@react-native-firebase/app';
import {
    getStorage,
    getDownloadURL,
    ref,
} from '@react-native-firebase/storage';

async function fetchFileFromStorage(refId: string): Promise<string | null> {
    const app = getApp();
    const storage = getStorage(app);

    try {
        const fileRef = ref(storage, refId);
        return await getDownloadURL(fileRef);
    } catch {
        return null;
    }
}

export default fetchFileFromStorage;
