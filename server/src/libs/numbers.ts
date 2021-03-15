export const roundValue = (value: number, scale = 2): number => {
    const rounded = +value.toFixed(scale)
    return rounded
}
