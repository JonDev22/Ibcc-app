import { Platform } from 'react-native';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import { getApp } from '@react-native-firebase/app';
import { getStorage, ref, putFile } from '@react-native-firebase/storage';

async function uploadTbtAtHomeFile(
    file: DocumentPickerResponse,
    path: string,
): Promise<string | null> {
    const app = getApp();
    const storage = getStorage(app);

    try {
        const reference = ref(storage, path);
        // Convert uri
        const uri =
            Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;

        await putFile(reference, uri);
        return path;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default uploadTbtAtHomeFile;
