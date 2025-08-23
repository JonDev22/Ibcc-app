const padTime = (input: number): string => {
    return input.toString().padStart(2, '0');
};

function formatDurationTime(time: number): string {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${padTime(min)}:${padTime(sec)}`;
}

export default formatDurationTime;
