import type { Order } from "@/types/order";

export const orders: Order[] = [
    {
        id: "ORD-211",
        customerId: "CST-1",
        items: [
            {
                productId: "I-426",
                productName: "Office Chair",
                quantity: 6,
                //price in yen
                priceAtPurchase: 5000
            },
            {
                productId: "I-782",
                productName: "Black Desk",
                quantity: 6,
                priceAtPurchase: 10000
            }
        ],
        //total amount in yen
        totalAmount: 90000,
        status: "ready_to_ship",
        createdAt: "2026-09-10T15:12:00Z",
        updatedAt: "2026-09-25T13:35:00Z",
    },
    {
        id: "ORD-12",
        customerId: "CST-2",
        items: [
            {
                productId: "I-105",
                productName: "Storage Cabinet",
                quantity: 2,
                priceAtPurchase: 6000,
            },
        ],
        totalAmount: 12000,
        status: "awaiting_payment",
        createdAt: "2026-09-17T18:10:00Z",
        updatedAt: "2026-09-17T18:10:00Z",
    },
    {
        id: "ORD-43",
        customerId: "CST-3",
        items: [
            {
                productId: "I-105",
                productName: "Storage Cabinet",
                quantity: 2,
                priceAtPurchase: 6000,
            },
            {
                productId: "I-434",
                productName: "Modular Sofa",
                quantity: 1,
                priceAtPurchase: 70000
            },
            {
                productId: "I-482",
                productName: "Endtable",
                quantity: 2,
                priceAtPurchase: 4000
            }
        ],
        totalAmount: 90000,
        status: "completed",
        createdAt: "2026-09-27T14:21:00Z",
        updatedAt: "2026-10-09T18:10:00Z",
    },
    {
        id: "ORD-64",
        customerId: "CST-1",
        items: [
            {
                productId: "I-105",
                productName: "Storage Cabinet",
                quantity: 2,
                priceAtPurchase: 6000,
            },
        ],
        totalAmount: 12000,
        status: "cancelled",
        createdAt: "2026-09-02T14:28:00Z",
        updatedAt: "2026-09-20T15:14:00Z",
    },
    {
        id: "ORD-55",
        customerId: "CST-4",
        items: [
            {
                productId: "I-788",
                productName: "Wide Screen TV",
                quantity: 4,
                priceAtPurchase: 100000,
            },
            {
                productId: "I-793",
                productName: "Wooden TV Stand",
                quantity: 4,
                priceAtPurchase: 50000
            },
        ],
        totalAmount: 600000,
        status: "ready_to_ship",
        createdAt: "2026-10-03T14:21:00Z",
        updatedAt: "2026-10-07T18:10:00Z",
    },

]