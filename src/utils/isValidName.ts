export const isValidName = (name: string) => {
    const cleanName = name.trim().replace(/\s+/g, " ");

    // Only letters and spaces
    if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(cleanName)) {
        return false;
    }

    // Each word must have at least 2 characters
    const words = cleanName.split(" ");

    if (words.some((word) => word.length < 2)) {
        return false;
    }

    // Reject words with 4+ consecutive consonants
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(cleanName)) {
        return false;
    }

    return true;
}