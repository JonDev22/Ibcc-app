import { getApp } from '@react-native-firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

async function authenticate(email: string, password: string): Promise<string> {
    const app = getApp();
    const auth = getAuth(app);

    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        console.log(cred);
        if (cred.user) {
            return 'success';
        }
        return 'error';
    } catch (err) {
        return String(err);
    }
}

export default authenticate;
