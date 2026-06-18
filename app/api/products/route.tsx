import { NextResponse } from "next/server";
import schema from "./schema";
export function GET(request:Request) {
    return NextResponse.json([
        {id:1,name:'Milk',price:2.5},
        {id:2,name:'Bread',price:1.5},
        {id:3,name:'Eggs',price:3.0},
    ]);
}

export async function POST(request:Request) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if(!validation.success)
        return NextResponse.json({error:validation.error.message},{status:400});
    return NextResponse.json({id:1,name:body.name,price:body.price},{status:201});
}