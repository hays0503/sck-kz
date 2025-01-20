export default function beautifulCost(number: number|string) {
    if (typeof number === 'string') {
        return `${number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸`;
    }
    if (typeof number === 'number') {
        return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₸`;
    }    
}