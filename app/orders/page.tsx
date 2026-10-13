"use client"

import { useOrders } from "@/context/OrdersContext";
import OrdersTable from "@/components/OrdersTable";

export default function OrdersPage() {

    const { orders } = useOrders()

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Orders
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage and track your customer orders.
                        </p>
                    </div>

                    <div className="self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                        {orders.length} Total Orders
                    </div>
                </div>

                {/* Orders Table */}
                <OrdersTable />
                
            </div>
        </main>
    );
}