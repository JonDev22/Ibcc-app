import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveSystemSettings(
    key: string,
    setting: string,
): Promise<string> {
    try {
        await AsyncStorage.setItem(key, setting);
        return 'success';
    } catch (err) {
        return String(err);
    }
}

export default saveSystemSettings;
