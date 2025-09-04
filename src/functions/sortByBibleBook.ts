import { bibleOrder } from '../utils/bibleOrder';

const parseReference = (ref: string) => {
    const bookMatch = ref.match(/^(\d?\s?[A-Za-z]+(?:\s[A-Za-z]+)?)/);
    const book = bookMatch ? bookMatch[1].trim() : '';

    const numbers = ref.match(/\d+/g)?.map(Number) || [];

    const chapter = numbers[0] || 0;
    const verse = numbers[1] || 0;

    return { book, chapter, verse };
};

function sortByBibleBook<T extends Record<string, any>>(
    list: T[],
    key: keyof T,
): T[] {
    return [...list].sort((a, b) => {
        const refA = parseReference(a[key]);
        const refB = parseReference(b[key]);

        const indexA = bibleOrder.indexOf(refA.book ?? '');
        const indexB = bibleOrder.indexOf(refB.book ?? '');

        const safeIndexA = indexA === -1 ? bibleOrder.length : indexA;
        const safeIndexB = indexA === -1 ? bibleOrder.length : indexB;

        if (safeIndexA !== safeIndexB) {
            return safeIndexA - safeIndexB;
        }

        if (refA.chapter !== refB.chapter) {
            return refA.chapter - refB.chapter;
        }

        return refA.verse - refB.verse;
    });
}

export default sortByBibleBook;
