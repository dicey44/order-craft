import OrderOverview from "@/components/OrderOverview";
import RecentOrders from "@/components/RecentOrders";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
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
            </div>
            
        </main>
    );
}