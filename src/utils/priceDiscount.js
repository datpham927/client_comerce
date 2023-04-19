export const convertPrice = (price, amount, discount) => {
    return (price * amount) - (price * amount * discount / 100)
}