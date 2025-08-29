import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IPassage {
    id: string;
    date: FirebaseFirestoreTypes.Timestamp;
    passage: string;
}
