import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';
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

        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
        }

        const dest = `${RNFS.TemporaryDirectoryPath}/${file.name}`;
        await RNFS.copyFile(file.uri, dest);
        // Remove file:// from file URI (required for Android)

        const uri =
            Platform.OS === 'ios' ? file.uri.replace('file://', '') : dest;

        await putFile(reference, uri);
        return path;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default uploadTbtAtHomeFile;
