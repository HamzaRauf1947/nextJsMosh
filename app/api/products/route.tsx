import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/lib/prisma";
export async function GET(request:Request) {
    const product = await prisma.product.findMany();
    return NextResponse.json(product);
}

export async function POST(request:Request) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if(!validation.success)
        return NextResponse.json({error:validation.error.message},{status:400});
    const product = prisma.product.create({
        data:{
            name:body.name,
            price:body.price,
        }
    })
    return NextResponse.json(product,{status:201});
}

