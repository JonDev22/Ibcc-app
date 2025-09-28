import { Timestamp } from '@react-native-firebase/firestore';

type hasAdded = { added: Timestamp };

function sortByAddedDate<T extends hasAdded>(a: T, b: T) {
    return b.added.toMillis() - a.added.toMillis();
}

export default sortByAddedDate;
