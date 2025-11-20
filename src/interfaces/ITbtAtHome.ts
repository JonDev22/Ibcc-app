import { Timestamp } from '@react-native-firebase/firestore';

export interface ITbtAtHome {
    id: string;
    title: string;
    passage: string;
    added: Timestamp;
    resource: string;
}
