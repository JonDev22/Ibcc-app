import { Timestamp } from '@react-native-firebase/firestore';

type hasDate = { date: Timestamp };
type sortOrder = 'asc' | 'desc';

function sortByDate<T extends hasDate>(a: T, b: T, order: sortOrder): number {
    // Ascending meaning the earliest date first
    // Descending meaning the latest date first
    const diff = a.date.toDate().getTime() - b.date.toDate().getTime();
    return order === 'asc' ? diff : -diff;
}

export default sortByDate;
