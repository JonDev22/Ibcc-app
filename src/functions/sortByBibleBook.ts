import { bibleOrder } from '../utils/bibleOrder';

function sortByBibleBook<T extends Record<string, any>>(
    list: T[],
    key: keyof T,
): T[] {
    return [...list].sort((a, b) => {
        const bookA = a[key] as string | undefined;
        const bookB = b[key] as string | undefined;

        const indexA = bibleOrder.indexOf(bookA ?? '');
        const indexB = bibleOrder.indexOf(bookB ?? '');

        const safeIndexA = indexA === -1 ? bibleOrder.length : indexA;
        const safeIndexB = indexA === -1 ? bibleOrder.length : indexB;

        return safeIndexA - safeIndexB;
    });
}

export default sortByBibleBook;
