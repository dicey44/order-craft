import OrderOverview from "@/components/OrderOverview";
import RecentOrders from "@/components/RecentOrders";

export default function Home() {
    return (
        <main className="max-w-7xl px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>
                <p className="mt-2 text-slate-500">
                    Monitor and manage your business orders.
                </p>
            </div>

            <OrderOverview />
            <RecentOrders />
        </main>
    );
}