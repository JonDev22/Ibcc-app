import AsyncStorage from '@react-native-async-storage/async-storage';

async function getSystemSettings(key: string): Promise<string | null> {
    try {
        const item = await AsyncStorage.getItem(key);
        return item;
    } catch (err) {
        return String(err);
    }
}

export default getSystemSettings;
