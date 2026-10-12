import { orders } from "@/data/orders";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrderDetailsClient from "@/components/OrderDetailsClient";

export const instant = false;

interface OrderDetailsProps {
    params: Promise<{ id: string }>
}

export default async function OrderDetails({params}: OrderDetailsProps) {
    const { id } = await params;
    const myOrder = orders.find(obj => obj.id.toLowerCase() === id.toLowerCase());
    if (!myOrder) {
        notFound()
    }
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Back Navigation */}
                <Link
                    href="/orders"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                >
                    <span aria-hidden="true">←</span>
                    Back to Orders
                </Link>
                <OrderDetailsClient initialStatus={myOrder.status} orderId={myOrder.id}
                header={(
                    <div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-slate-500">
                                Order Details
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight">
                                {myOrder.id}
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Customer: {myOrder.customerId}
                            </p>
                        </div>
                    </div>
                )}
                >
                {/* Order Summary */}
                <section
                    aria-labelledby="order-summary-heading"
                    className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h2
                        id="order-summary-heading"
                        className="mb-5 text-lg font-semibold"
                    >
                        Order Summary
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-3">
                        <div>
                            <p className="text-sm text-slate-500">Customer ID</p>
                            <p className="mt-1 font-semibold">{myOrder.customerId}</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">Created</p>
                            <p className="mt-1 font-semibold">
                                {new Date(myOrder.createdAt).toLocaleDateString(
                                    "ja-JP",
                                    { timeZone: "Asia/Tokyo" }
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">Last Updated</p>
                            <p className="mt-1 font-semibold">
                                {new Date(myOrder.updatedAt).toLocaleDateString(
                                    "ja-JP",
                                    { timeZone: "Asia/Tokyo" }
                                )}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Order Items */}
                <section
                    aria-labelledby="order-items-heading"
                    className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                    <div className="border-b border-slate-200 px-6 py-5">
                        <h2
                            id="order-items-heading"
                            className="text-lg font-semibold"
                        >
                            Order Items
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Products included in this order.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Product ID</th>
                                    <th scope="col" className="px-6 py-4">Product</th>
                                    <th scope="col" className="px-6 py-4 text-right">Quantity</th>
                                    <th scope="col" className="px-6 py-4 text-right">Unit Price</th>
                                    <th scope="col" className="px-6 py-4 text-right">Subtotal</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {myOrder.items.map((item) => (
                                    <tr
                                        key={item.productId}
                                        className="transition-colors hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-4 text-slate-500">
                                            {item.productId}
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {item.productName}
                                        </td>
                                        <td className="px-6 py-4 text-right tabular-nums">
                                            {item.quantity.toLocaleString("ja-JP")}
                                        </td>
                                        <td className="px-6 py-4 text-right tabular-nums">
                                            ¥{item.priceAtPurchase.toLocaleString("ja-JP")}
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold tabular-nums">
                                            ¥{(item.priceAtPurchase * item.quantity).toLocaleString("ja-JP")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Order Total */}
                    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-5">
                        <span className="font-semibold text-slate-700">
                            Order Total
                        </span>
                        <span className="text-xl font-bold tabular-nums text-slate-900">
                            ¥{myOrder.totalAmount.toLocaleString("ja-JP")}
                        </span>
                    </div>
                </section>
                </OrderDetailsClient>
            </div>
        </main>
    );
}