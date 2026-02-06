import { copyFile, CachesDirectoryPath, exists, unlink } from 'react-native-fs';
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
    const dest = `${CachesDirectoryPath}/${fileName}`;
    let decodedSourceUri = decodeURIComponent(file.uri);

    try {
        if (Platform.OS === 'android') {
            await copyFile(file.uri, dest);
        } else {
            await copyFile(decodedSourceUri, dest);
        }

        const reference = ref(storage, path);

        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
        }

        const uri =
            Platform.OS === 'ios'
                ? decodedSourceUri.replace('file://', '')
                : dest;

        console.log('A');
        await putFile(reference, uri);
        return path;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        const existsFile = await exists(dest);
        if (existsFile) {
            await unlink(dest).catch(() => {
                console.error('Could not delete');
            });
        }
    }
}

export default uploadTbtAtHomeFile;
