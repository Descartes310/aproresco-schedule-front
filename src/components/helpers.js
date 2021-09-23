export const formatDate = (date) => {
    date = (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear();
    return date;
}

export const truncate = (string, length) => {
    if(string) {
        if(string.length <= length) {
            return string;
        } else {
            return string.substring(0, length-3)+'...'
        }
    }
}