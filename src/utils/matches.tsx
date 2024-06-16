export default function convertMillisecondsToDate(ms: number) {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const date = new Date(ms);
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero indexed in JavaScript
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // return `${dayOfWeek}, ${day}/${month} ${hours}:${
    //     minutes < 10 ? "0" : ""
    // }${minutes}`;

    return {
        day,
        month,
        hours,
        minutes,
        dayOfWeek,
    };
}

export const MatchIsEnd = (ms: number) => {
    return Date.now() > ms * 1000;
};
