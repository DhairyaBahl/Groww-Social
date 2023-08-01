/*
    format1: 2023-06-28T23:52:35Z
    format2: x days ago or x hours ago or x minutes ago or x seconds ago
    This function converts date from format1 to format2.
*/
export const handleDate = (date: string) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((currentDate.getTime() - postDate.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} years ago`;
    } else if (months > 0) {
        return `${months} months ago`;
    } else if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else if (seconds > 0) {
        return `${seconds} seconds ago`;
    } else {
        return 'just now';
    }

};