import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import OrdersTable from "./OrdersTable";


vi.mock("@/context/OrdersContext", () => ({
    useOrders: () => ({
        orders: [
            {
                id: "ORD-1",
                customerId: "CST-100",
                status: "completed",
                totalAmount: 30000,
                updatedAt: "2026-10-01T12:00:00Z",
            },
            {
                id: "ORD-2",
                customerId: "CST-200",
                status: "awaiting_payment",
                totalAmount: 15000,
                updatedAt: "2026-10-02T12:00:00Z",
            },
        ],
    }),
}));

describe("OrdersTable", () => {
    it("renders the orders table with correct data", () => {
        render(<OrdersTable />);

        const table = screen.getByRole("table");


        // Check if the order IDs are rendered
        expect(screen.getByText("ORD-1")).toBeInTheDocument();
        expect(screen.getByText("ORD-2")).toBeInTheDocument();

        // Check if the customer IDs are rendered
        expect(within(table).getByText("CST-100")).toBeInTheDocument();
        expect(within(table).getByText("CST-200")).toBeInTheDocument();

        // Check if the status labels are rendered
        expect(within(table).getByText("Completed")).toBeInTheDocument();
        expect(within(table).getByText("Awaiting Payment")).toBeInTheDocument();
    });
});