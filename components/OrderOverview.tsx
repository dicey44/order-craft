import { orders } from "@/data/orders";

export default function OrderOverview() {

    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === "completed").length;
    const awaitingPaymentOrders = orders.filter(order => order.status === "awaiting_payment").length;
    const readyToShipOrders = orders.filter(order => order.status === "ready_to_ship").length;

    const completedRevenue = orders.filter(order => order.status === "completed").reduce((accumulator, currentValue) => {
        return accumulator + currentValue.totalAmount
    }, 0)

    return (
    <section aria-labelledby="order-overview-heading">
        <h2
            id="order-overview-heading"
            className="mb-5 text-xl font-semibold text-slate-900"
        >
            Order Overview
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
                { label: "Total Orders", value: totalOrders },
                { label: "Awaiting Payment", value: awaitingPaymentOrders },
                { label: "Ready to Ship", value: readyToShipOrders },
                { label: "Completed", value: completedOrders },
                { label: "Completed Revenue", value: "￥" + completedRevenue.toLocaleString("ja-JP")}
            ].map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <p className="text-sm font-medium text-slate-500">
                        {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    </section>
);
}