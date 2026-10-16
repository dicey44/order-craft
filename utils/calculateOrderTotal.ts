export default function calculateOrderTotal(quantity: number, price: number): number {
    if (quantity < 0 || price < 0) {
        throw new Error("Quantity and price must be non-negative numbers.");
    }
    return quantity * price;
}