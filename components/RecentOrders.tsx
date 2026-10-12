"use client"

import { useOrders } from "@/context/OrdersContext";
import Link from "next/link";

export default function RecentOrders() {
    const { orders } = useOrders();

    const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

    return (
        <section
            aria-labelledby="recent-orders-heading"
            className="mt-10 rounded-xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="border-b border-slate-200 px-6 py-5">
                <h2
                    id="recent-orders-heading"
                    className="text-xl font-semibold text-slate-900"
                >
                    Recent Orders
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Your three most recently created orders.
                </p>
            </div>

            <ul className="divide-y divide-slate-100">
                {recentOrders.map((obj) => (
                    <li key={obj.id} className="transition-colors hover:bg-slate-50">
                        <Link href={`orders/${obj.id}`} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {obj.id}
                                </p>
                                <p className="mt-1 text-xs text-slate-500">
                                    {new Date(obj.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            timeZone: "Asia/Tokyo",
                                        }
                                    )}
                                </p>
                            </div>

                            <span
                                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                    obj.status === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : obj.status === "ready_to_ship"
                                        ? "bg-blue-100 text-blue-700"
                                        : obj.status === "awaiting_payment"
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {obj.status.replaceAll("_", " ")}
                            </span>
                        </Link>
                    </li>
                    
                ))}
            </ul>
        </section>
    );
}