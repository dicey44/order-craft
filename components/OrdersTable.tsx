"use client"

import type { Order } from "@/types/order"
import { useState } from "react"
import Link from "next/link"

interface OrdersTableProps {
    orders: Order[]
}

export default function OrdersTable({orders}: OrdersTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const trimmedQuery = searchQuery.trim().toLowerCase();
    const filteredOrders = orders.filter(order => {
        
        const lowerCaseOrder = order.id.toLowerCase();
        const lowerCaseCustomer = order.customerId.toLowerCase();

        const matchesSearch = lowerCaseOrder.includes(trimmedQuery) || lowerCaseCustomer.includes(trimmedQuery);

        const matchesFilter = statusFilter === "all" || statusFilter === order.status;

        return matchesSearch && matchesFilter
    });

    const statusStyles: Record<string, string> = {
        ready_to_ship: "bg-blue-50 text-blue-700 ring-blue-200",
        awaiting_payment: "bg-amber-50 text-amber-700 ring-amber-200",
        completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        cancelled: "bg-red-50 text-red-700 ring-red-200",
    };

    const statusLabels: Record<string, string> = {
        ready_to_ship: "Ready to Ship",
        awaiting_payment: "Awaiting Payment",
        completed: "Completed",
        cancelled: "Cancelled",
    };

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 sm:flex-row sm:items-end">

                {/* Search */}
                <div className="w-full sm:max-w-sm">
                    <label
                        htmlFor="order-search"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Search orders
                    </label>

                    <input
                        id="order-search"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Order ID or Customer ID..."
                        autoComplete="off"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                    />
                </div>

                {/* Status Filter */}
                <div className="w-full sm:w-56">
                    <label
                        htmlFor="order-status"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Order status
                    </label>

                    <select
                        id="order-status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-colors hover:border-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
                    >
                        <option value="all">All</option>
                        <option value="awaiting_payment">Awaiting Payment</option>
                        <option value="ready_to_ship">Ready to Ship</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-slate-900">
                    All Orders
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    A complete overview of customer orders.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] border-collapse text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4 text-right">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Last Updated
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {filteredOrders.length !== 0 ? filteredOrders.map((order) => {
                            const date = new Date(order.updatedAt);

                            const formattedDate = date.toLocaleDateString(
                                "ja-JP",
                                {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    timeZone: "Asia/Tokyo",
                                }
                            );

                            return (
                                <tr
                                    key={order.id}
                                    className="transition-colors hover:bg-slate-50"
                                >
                                    <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                        <Link
                                            href={`/orders/${order.id}`}
                                            className="rounded text-blue-600 hover:text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                                        >
                                            {order.id}
                                        </Link>
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-700">
                                        {order.customerId}
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                                                statusStyles[order.status] ??
                                                "bg-slate-100 text-slate-600 ring-slate-200"
                                            }`}
                                        >
                                            {statusLabels[order.status] ??
                                                order.status}
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4 text-right font-semibold tabular-nums text-slate-900">
                                        ¥{order.totalAmount.toLocaleString("ja-JP")}
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                                        {formattedDate}
                                    </td>
                                </tr>
                            );
                        }): 
                        <tr ><td colSpan={5}>No orders found. Try adjusting your search or filters.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className="border-t border-slate-200 bg-white px-6 py-4">
                <p className="text-sm text-slate-500">
                    Showing <span className="font-medium text-slate-700">{filteredOrders.length}</span> orders
                </p>
            </div>
        </div>
    )
}