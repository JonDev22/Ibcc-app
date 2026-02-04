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

    const fileName = decodeURIComponent(file.name ?? 'upload_file');
    const dest = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
    const decodedSourceUri = decodeURIComponent(file.uri);

    try {
        await RNFS.copyFile(decodedSourceUri, dest);

        const reference = ref(storage, path);

        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
        }

        console.log(decodedSourceUri);

        const uri =
            Platform.OS === 'ios' ? decodedSourceUri.replace('file://', '') : dest;

        await putFile(reference, uri);
        return path;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        const exists = await RNFS.exists(dest);
        if (exists) {
            await RNFS.unlink(dest).catch(() => {
                console.error('Could not delete');
            });
        }
    }
}

export default uploadTbtAtHomeFile;
