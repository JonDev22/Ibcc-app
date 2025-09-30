import { IPassage } from '../interfaces/IPassage';

function getAdjacentSundays(passages: IPassage[]): {
    prev: IPassage | undefined;
    next: IPassage | undefined;
} {
    const today = new Date();

    const prev = passages
        .filter(s => s.date.toDate() <= today)
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

    const next = passages
        .filter(s => s.date.toDate() > today)
        .sort((a, b) => (a.date < b.date ? -1 : 1))[0];

    return { prev, next };
}

export default getAdjacentSundays;
