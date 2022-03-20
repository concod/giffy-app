export const fillEmptyArray = (value, length) => {
    const newArray = []
    for (let index = 0; index < length; index++) {
        newArray.push(value)
    }
    return newArray
}