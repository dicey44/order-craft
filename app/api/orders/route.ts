import { NextResponse } from "next/server";
import { orders } from "@/data/orders";

export async function GET() {
    return NextResponse.json(orders)
}