export function handleBio(bio: string) {
    return bio ? bio.substring(1, bio.length - 1) : 'No bio';
}