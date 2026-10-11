import { orders } from "@/data/orders";

export default function OrdersPage() {
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
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

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
                                {orders.map((order) => {
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
                                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-blue-600">
                                                {order.id}
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
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="border-t border-slate-200 bg-white px-6 py-4">
                        <p className="text-sm text-slate-500">
                            Showing <span className="font-medium text-slate-700">{orders.length}</span> orders
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}