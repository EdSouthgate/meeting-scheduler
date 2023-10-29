
function toTwoDigits(num: number): string {
    return ("0" + num.toString()).slice(-2);
}

export { toTwoDigits } 