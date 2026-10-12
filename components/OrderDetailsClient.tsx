"use client"

import OrderStatusForm from "./OrderStatusForm"

import { useState } from "react"

interface OrderDetailsClientProps {
    children: React.ReactNode;
    header: React.ReactNode;
    initialStatus: string;
    orderId: string;
}

export default function OrderDetailsClient({ children, header, initialStatus, orderId }: OrderDetailsClientProps) {
    const [status, setStatus] = useState(initialStatus)

    return (
        <div>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                {header}
                <span
                    className={`inline-flex self-start rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset ${
                        status === "completed"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : status === "ready_to_ship"
                            ? "bg-blue-50 text-blue-700 ring-blue-200"
                            : status === "awaiting_payment"
                            ? "bg-amber-50 text-amber-700 ring-amber-200"
                            : "bg-red-50 text-red-700 ring-red-200"
                    }`}
                >
                    {status.replaceAll("_", " ")}
                </span>
            </div>
            
            {children}
            <OrderStatusForm orderId={orderId} currentStatus={status} onStatusUpdated={setStatus}/>
        </div>
    )
}