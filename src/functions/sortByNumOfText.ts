type TextPair = [string, string];
type UrlPair = [string, { url: string }];
type Input = TextPair[] | UrlPair[];

function sortByNumOfText(items: TextPair[]): TextPair[];
function sortByNumOfText(items: UrlPair[]): UrlPair[];
function sortByNumOfText(items: Input): Input {
    const extractNumber = (text: string): number | null => {
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
    };

    return items.sort((a, b) => {
        const numA = extractNumber(a[0]);
        const numB = extractNumber(b[0]);

        const rankA = numA === null ? Infinity : numA;
        const rankB = numB === null ? Infinity : numB;
        return rankA - rankB;
    });
}

export default sortByNumOfText;
