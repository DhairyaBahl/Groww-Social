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

    const isPlural: boolean = (
        years > 1 ||
        months > 1 ||
        days > 1 ||
        hours > 1 ||
        minutes > 1 ||
        seconds > 1
    )

    if (years > 0) {
        return `${years} year${isPlural ? 's' : ''} ago`;
    }
    if(months > 0) {
        return `${months} month${isPlural ? 's' : ''} ago`;
    }
    if(days > 0) {
        return `${days} day${isPlural ? 's' : ''} ago`;
    }
    if(hours > 0) {
        return `${hours} hour${isPlural ? 's' : ''} ago`;
    }
    if(minutes > 0) {
        return `${minutes} minute${isPlural ? 's' : ''} ago`;
    }
    if(seconds > 0) {
        return `${seconds} second${isPlural ? 's' : ''} ago`;
    }
    return 'just now';
};