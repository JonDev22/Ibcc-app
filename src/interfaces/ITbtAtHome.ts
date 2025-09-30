import { Timestamp } from '@react-native-firebase/firestore';

export interface ITbtAtHome {
    title: string;
    passage: string;
    added: Timestamp;
    resource: string;
}
