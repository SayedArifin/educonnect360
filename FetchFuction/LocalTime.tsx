export const Time = (time: string = "") => {
    const dateObject = new Date(time);
    const humanReadableDate = dateObject.toLocaleString();
    return humanReadableDate;
}