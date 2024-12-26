export function isValid(rno: string): boolean {
    // append changes to validity logic here
    // roll numbers are 9 digits
    const regex = /^\d{9}$/;
    return regex.test(rno);
}