import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        
        console.log(params.id)
    
        const organizacion = await prisma.usuario.findFirst({
            where:{
                correo: params.id
                
            },
            include: {
                organizacion: true, // Cargar usuarios relacionados
            }
        })

        return NextResponse.json({
            organizacion
        })
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}
