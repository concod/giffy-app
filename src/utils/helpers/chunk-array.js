export const chunkArray = (arr, parts) => {
    let result = [];
    const array = [...arr]
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}