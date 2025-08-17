interface sundayProps {
    date: Date;
    passage: string;
}

function getAdjacentSundays(): { prev: sundayProps; next: sundayProps } {
    const today = new Date();
    const sundays = sundayVerses2025.map(s => ({
        ...s,
        date: new Date(s.date),
    }));

    const prev = sundays
        .filter(s => s.date <= today)
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

    const next = sundays
        .filter(s => s.date > today)
        .sort((a, b) => (a.date < b.date ? -1 : 1))[0];

    return { prev, next };
}

export default getAdjacentSundays;

export const sundayVerses2025 = [
    { date: '2025-01-05', passage: 'Isaiah 40:31' },
    { date: '2025-01-12', passage: 'Psalm 23:1-3' },
    { date: '2025-01-19', passage: 'John 3:16' },
    { date: '2025-01-26', passage: 'Romans 8:28' },
    { date: '2025-02-02', passage: 'Philippians 4:13' },
    { date: '2025-02-09', passage: 'Matthew 5:14-16' },
    { date: '2025-02-16', passage: '1 Corinthians 13:4-7' },
    { date: '2025-02-23', passage: 'Proverbs 3:5-6' },
    { date: '2025-03-02', passage: 'Psalm 119:105' },
    { date: '2025-03-09', passage: 'Romans 12:2' },
    { date: '2025-03-16', passage: 'Isaiah 41:10' },
    { date: '2025-03-23', passage: 'John 14:6' },
    { date: '2025-03-30', passage: 'Psalm 46:1' },
    { date: '2025-04-06', passage: 'Matthew 11:28-30' },
    { date: '2025-04-13', passage: 'Ephesians 2:8-9' },
    { date: '2025-04-20', passage: '2 Corinthians 5:17' },
    { date: '2025-04-27', passage: 'Joshua 1:9' },
    { date: '2025-05-04', passage: 'Psalm 37:4' },
    { date: '2025-05-11', passage: 'Galatians 5:22-23' },
    { date: '2025-05-18', passage: 'Matthew 6:33' },
    { date: '2025-05-25', passage: 'Isaiah 43:2' },
    { date: '2025-06-01', passage: 'Romans 15:13' },
    { date: '2025-06-08', passage: 'Philippians 4:6-7' },
    { date: '2025-06-15', passage: 'Psalm 34:8' },
    { date: '2025-06-22', passage: 'Colossians 3:16' },
    { date: '2025-06-29', passage: 'John 15:5' },
    { date: '2025-07-06', passage: 'Hebrews 11:1' },
    { date: '2025-07-13', passage: 'Psalm 27:1' },
    { date: '2025-07-20', passage: 'Matthew 28:19-20' },
    { date: '2025-07-27', passage: '1 Peter 5:7' },
    { date: '2025-08-03', passage: 'Proverbs 16:3' },
    { date: '2025-08-10', passage: 'Isaiah 40:29' },
    { date: '2025-08-17', passage: 'James 1:5' },
    { date: '2025-08-24', passage: 'Psalm 121:1-2' },
    { date: '2025-08-31', passage: 'Romans 5:8' },
    { date: '2025-09-07', passage: 'Matthew 5:9' },
    { date: '2025-09-14', passage: 'Philippians 2:3-4' },
    { date: '2025-09-21', passage: 'Jeremiah 29:11' },
    { date: '2025-09-28', passage: 'Psalm 19:14' },
    { date: '2025-10-05', passage: '1 John 4:19' },
    { date: '2025-10-12', passage: 'Matthew 7:7' },
    { date: '2025-10-19', passage: 'Isaiah 26:3' },
    { date: '2025-10-26', passage: 'Romans 12:12' },
    { date: '2025-11-02', passage: 'Psalm 118:24' },
    { date: '2025-11-09', passage: 'John 8:12' },
    { date: '2025-11-16', passage: 'Ephesians 6:10-11' },
    { date: '2025-11-23', passage: 'Colossians 3:23' },
    { date: '2025-11-30', passage: '1 Corinthians 16:14' },
    { date: '2025-12-07', passage: 'Psalm 103:2-3' },
    { date: '2025-12-14', passage: 'Micah 6:8' },
    { date: '2025-12-21', passage: 'Luke 2:10-11' },
    { date: '2025-12-28', passage: '2 Timothy 1:7' },
];
