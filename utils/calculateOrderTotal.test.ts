import {describe, it, expect} from "vitest";
import calculateOrderTotal from "./calculateOrderTotal";

describe("calculateOrderTotal", () => {
    it("calculates the correct order total", () => {
        const quantity = 3;
        const price = 10;
        const expectedTotal = 30;

        const total = calculateOrderTotal(quantity, price);
        expect(total).toBe(expectedTotal);
    });

    it("throws an error for negative quantity", () => {
        expect(() => calculateOrderTotal(-1, 10)).toThrow("Quantity and price must be non-negative numbers.");
    });

    it("throws an error for negative price", () => {
        expect(() => calculateOrderTotal(1, -10)).toThrow("Quantity and price must be non-negative numbers.");
    });
});