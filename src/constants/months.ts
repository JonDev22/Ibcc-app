export const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export const getMonthAbbreviation = (monthIndex: number): string => {
    if (monthIndex < 0 || monthIndex > MONTHS.length - 1) {
        MONTHS[0];
    }
    return MONTHS[monthIndex];
};
