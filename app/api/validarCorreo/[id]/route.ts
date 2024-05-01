import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        
        console.log(params.id)
    
        const user = await prisma.usuario.findFirst({
            where:{
                correo: params.id
            }
        });
        return NextResponse.json({
            user
        })
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}