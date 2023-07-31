// convert 2023-06-28T23:52:35Z to x days ago or x hours ago or x minutes ago or x seconds ago

export const handleDate = (date: string) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((currentDate.getTime() - postDate.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days} days ago`;
    } else if (hours > 0) {
        return `${hours} hours ago`;
    } else if (minutes > 0) {
        return `${minutes} minutes ago`;
    } else {
        return `${seconds} seconds ago`;
    }
};