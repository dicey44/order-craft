
"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { orders as initialOrders } from "@/data/orders";
import type { Order } from "@/types/order";

type OrderStatus = Order["status"];

interface OrdersContextType {
    orders: Order[];
    updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
    addOrder: (newOrder: Order) => void;
    removeOrder: (orderId: string) => void;
    isLoaded: boolean;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved orders once when the app starts.
    useEffect(() => {
        try {
            const savedOrders = localStorage.getItem("ordercraft-orders");

            if (savedOrders) {
                const parsedOrders: unknown = JSON.parse(savedOrders);

                if (Array.isArray(parsedOrders)) {
                    setOrders(parsedOrders as Order[]);
                }
            }
        } catch (error) {
            console.error("Failed to load saved orders:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save changes after the initial data has loaded.
    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(
                "ordercraft-orders",
                JSON.stringify(orders)
            );
        } catch (error) {
            console.error("Failed to save orders:", error);
        }
    }, [orders, isLoaded]);

    // Update an order in shared state.
    function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
        setOrders((previousOrders) =>
            previousOrders.map((order) => {
                if (order.id !== orderId) {
                    return order;
                }

                return {
                    ...order,
                    status: newStatus,
                    updatedAt: new Date().toISOString(),
                };
            })
        );
    }

    function addOrder(newOrder: Order) {
        setOrders(prevOrders => [...prevOrders, newOrder])
    }

    function removeOrder(orderId: string) {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
    }

    return (
        <OrdersContext.Provider value={{ orders, updateOrderStatus, addOrder, isLoaded, removeOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrdersContext);

    if (context === undefined) {
        throw new Error("useOrders must be used within an OrdersProvider");
    }

    return context;
}
