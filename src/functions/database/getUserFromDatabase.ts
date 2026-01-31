import { getApp } from '@react-native-firebase/app';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    FirebaseFirestoreTypes,
    QueryFieldFilterConstraint,
} from '@react-native-firebase/firestore';
import { IUser } from '../../interfaces/IUser';

async function getUserFromDatabase(firebaseUser: FirebaseAuthTypes.User): Promise<IUser | null> {
    const app = getApp();
    const db = getFirestore(app);
    const usersRef = collection(db, 'users');
    const userDocRef = doc(usersRef, firebaseUser.uid);
    const user = await getDoc(userDocRef).then(
        (res) => {
            if (res.exists()) {
                return {
                    uid: res.id,
                    email: res.get('email'),
                    firstName: res.get('first_name'),
                    lastName: res.get('last_name'),
                    role: res.get('role'),
                } as IUser;
            } else {
                return null;
            }
        }).catch(() => {
            return null;
        })
    return user;
}

export default getUserFromDatabase;