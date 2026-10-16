"use client"

import { useState } from "react"
import { useOrders } from "@/context/OrdersContext";


interface OrderStatusFormProps {
    orderId: string;
    currentStatus: string;
    onStatusUpdated: (newStatus: string) => void;
}

export default function OrderStatusForm({orderId, currentStatus, onStatusUpdated}: OrderStatusFormProps) {
    const [status, setStatus] = useState(currentStatus);
    const [message, setMessage] = useState("");
    const { removeOrder } = useOrders();
    

    function handleSave() {
        onStatusUpdated(status);
        setMessage("Order status updated successfully!");
    }

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                    Update Order Status
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Change the status of this order.
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                    <label
                        htmlFor="order-status"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Order Status
                    </label>

                    <select
                        id="order-status"
                        value={status}
                        onChange={(e) => {
                            setMessage("");
                            setStatus(e.target.value);
                        }}                        
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                    >
                        <option value="awaiting_payment">Awaiting Payment</option>
                        <option value="ready_to_ship">Ready to Ship</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleSave}                    
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Save Status                
                </button>
                
            </div>
            { message && (
                <p 
                    role="status"
                    aria-live="polite"
                    className="mt-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200"
                >
                    {message}
                </p>
            )}
            
            <div className="mt-6 border-t border-slate-200 pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                            Delete Order
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Permanently remove this order from the system.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => removeOrder(orderId)}
                        className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete Order
                    </button>
                </div>
            </div>
        </section>
    );
}