import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/lib/prisma";


export async function GET(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
    const {id} =await params;
    const userId = parseInt(id);

    const user = await prisma.user.findUnique({
        where:{id:userId}
    })
  if(!user)
    return NextResponse.json({error:'user not found'}, {status:404});

  return NextResponse.json(user);

}

export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
     const {id} =await params;
    const userId = parseInt(id);

    const body = await request.json();
    const validation = schema.safeParse(body);
    if(!validation.success)
        return NextResponse.json({error:validation.error.message},{status:400});
    const user = await prisma.user.findUnique({
        where:{id:userId}
    })
    if(!user)
        return NextResponse.json({error:'user not found'},{status:404});
    const updatedUser = await prisma.user.update({
        where:{id:user.id},
        data:{
            name:body.name,
            email:body.email
        }

    })
    return NextResponse.json(updatedUser,{status:200});
}

export  async function DELETE(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
      const {id} =await params;
    const userId = parseInt(id);
    const user = await prisma.user.findUnique({
        where:{id:userId}
    })
    if(!user)
        return NextResponse.json({error:'user not found'},{status:404});
    await prisma.user.delete({
        where:{id:user.id}
    })
    return NextResponse.json({message:'user deleted'},{status:200});
}

export async function POST(request:NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);

    if(!validation.success)
        return NextResponse.json({error:"user already exist"},{status:400})

      const user = await prisma.user.findUnique({
        where:{email:body.email}
    })
    if(user) 
        return NextResponse.json({error:"user already exist"},{status:400})
    const newUser = await prisma.user.create({
        data:{
            name:body.name,
            email:body.email,
        }
    })
    return NextResponse.json(newUser,{status:201});
}