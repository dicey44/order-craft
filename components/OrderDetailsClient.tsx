
"use client";

import OrderStatusForm from "./OrderStatusForm";
import { useOrders } from "@/context/OrdersContext";

interface OrderDetailsClientProps {
    children: React.ReactNode;
    header: React.ReactNode;
    initialStatus: string;
    initialUpdatedAt: string;
    orderId: string;
}

export default function OrderDetailsClient({
    children,
    header,
    initialStatus,
    initialUpdatedAt,
    orderId,
}: OrderDetailsClientProps) {
    const { orders, updateOrderStatus } = useOrders();

    const currentOrder = orders.find((order) => order.id === orderId);

    const status = currentOrder?.status ?? initialStatus;
    const updatedAt = currentOrder?.updatedAt ?? initialUpdatedAt;

    function handleStatusUpdated(newStatus: string) {
        if (
            newStatus === "completed" ||
            newStatus === "ready_to_ship" ||
            newStatus === "awaiting_payment" ||
            newStatus === "cancelled"
        ) {
            updateOrderStatus(orderId, newStatus);
        }
    }

    const formattedUpdatedAt = new Date(updatedAt).toLocaleString("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

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

            <div className="mb-6 text-sm">
                <p className="text-slate-500">Last Updated</p>
                <p className="mt-1 font-semibold text-slate-900">
                    {formattedUpdatedAt}
                </p>
            </div>

            {children}

            <OrderStatusForm
                orderId={orderId}
                currentStatus={status}
                onStatusUpdated={handleStatusUpdated}
            />
        </div>
    );
}
