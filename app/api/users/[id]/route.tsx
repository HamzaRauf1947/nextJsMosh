import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";


export async function GET(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    const {id} =await params;
    const userId = parseInt(id);
  if(userId>10)
    return NextResponse.json({error:'user not found'}, {status:404});

  return NextResponse.json({id:1,name:"mosh"}, {status:200});

}

export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
     const {id} =await params;
    const userId = parseInt(id);

    const body = await request.json();
    const validation = schema.safeParse(body);
    if(!validation.success)
        return NextResponse.json({error:validation.error.message},{status:400});
    if(userId>10)
        return NextResponse.json({error:'user not found'},{status:404});
    return NextResponse.json({id:1,name:body.name},{status:200});
}

export  async function DELETE(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
      const {id} =await params;
    const userId = parseInt(id);
    if(userId>10)
        return NextResponse.json({error:'user not found'},{status:404});
    return NextResponse.json({message:'user deleted'},{status:200});
}