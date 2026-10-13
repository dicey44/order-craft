
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Order } from "@/types/order";
import { useOrders } from "@/context/OrdersContext";

interface CreateOrderModalProps {
    onClose: () => void;
}

export default function CreateOrderModal({ onClose }: CreateOrderModalProps) {
    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [priceAtPurchase, setPriceAtPurchase] = useState(0);
    const {orders, addOrder} = useOrders();

    function handleCreateOrder(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const now = new Date().toISOString();

        const newOrder: Order = {
            id: "ORD-" + (orders.length + 1),
            customerId: "CST-" + customerId.trim(),
            items: [
                {
                    productId: "I-" + productId.trim(),
                    productName: productName.trim(),
                    quantity: quantity,
                    priceAtPurchase: priceAtPurchase,
                },
            ],
            totalAmount: quantity * priceAtPurchase,
            status: "awaiting_payment",
            createdAt: now,
            updatedAt: now,
        };
        console.log(newOrder);
        addOrder(newOrder)
        console.log(orders)
        }

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-order-title"
                className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            >
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="create-order-title"
                            className="text-2xl font-bold tracking-tight text-slate-900"
                        >
                            Create New Order
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Enter the details for a new customer order.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </div>

                <form onSubmit={handleCreateOrder}>
                    <div className="max-h-[60vh] space-y-5 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-5">
                        <div className="space-y-2">
                            <label htmlFor="customerId" className="block text-sm font-medium text-slate-700">
                                Customer ID
                            </label>
                            <input
                                id="customerId"
                                type="text"
                                required
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                placeholder="e.g. CUST-001"
                                autoComplete="off"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="productId" className="block text-sm font-medium text-slate-700">
                                Product ID
                            </label>
                            <input
                                id="productId"
                                type="text"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                placeholder="e.g. I-782"
                                autoComplete="off"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="productName" className="block text-sm font-medium text-slate-700">
                                Product Name
                            </label>
                            <input
                                id="productName"
                                type="text"
                                required
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="e.g. Leather Sofa"
                                autoComplete="off"
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700">
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    required
                                    min={1}
                                    step={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="priceAtPurchase" className="block text-sm font-medium text-slate-700">
                                    Unit Price (¥)
                                </label>
                                <input
                                    id="priceAtPurchase"
                                    type="number"
                                    required
                                    min={1}
                                    step={1}
                                    value={priceAtPurchase}
                                    onChange={(e) => setPriceAtPurchase(Number(e.target.value))}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                                />
                            </div>
                        </div>
                        <div>
                            <p>Order Total</p>
                            <p>￥{(quantity * priceAtPurchase).toLocaleString("ja-JP")}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Create Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
