export const generateUnicId = (min:number = 1, max:number = 100000000000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}