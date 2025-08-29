const dayOrder: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

type WithDay = { day?: string };

function sortByDay<T extends WithDay>(items: T[]): T[] {
    return items.sort((a: T, b: T) => {
        const indexA = dayOrder.indexOf(a.day ?? '');
        const indexB = dayOrder.indexOf(b.day ?? '');

        const rankA = indexA === -1 ? Infinity : indexA;
        const rankB = indexA === -1 ? Infinity : indexB;

        return rankA - rankB;
    });
}

export default sortByDay;
