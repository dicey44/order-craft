import { NextResponse } from "next/server";
import { orders } from "@/data/orders";

interface RouteContext {
    params: Promise<{id: string}>
}

export async function PATCH(request: Request, { params }: RouteContext) {
    const validStatuses = [
        "ready_to_ship",
        "completed",
        "cancelled",
        "awaiting_payment"
    ];

    const { id } = await params;

    const myOrder = orders.find(order => order.id === id);

    if (!myOrder) {
        return NextResponse.json(
            {error: "Order not found"},
            {status: 404}
        )
    }

    const body = await request.json();

    if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
            {error: "Invalid Status"},
            {status: 400}
        )
    }

    myOrder.status = body.status;
    myOrder.updatedAt = new Date().toISOString();

    return NextResponse.json(myOrder);
}