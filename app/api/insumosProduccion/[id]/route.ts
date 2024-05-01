import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        
        console.log(params.id)
    
        const produccion = await prisma.produccion.findFirst({
           where :{
                id: Number(params.id)
           },include:{
            insumoproduccion: {
                include:{
                    insumo:true
                }
            },
            productos: true,
            productor: true,
            
           }
        })

        return NextResponse.json({
            produccion
        })
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}
