import { getAuth, signOut } from '@react-native-firebase/auth';

async function logOut() {
    const auth = getAuth();
    await signOut(auth);
}

export default logOut;
