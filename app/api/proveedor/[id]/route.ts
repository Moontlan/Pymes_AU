import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        const proveedor = await prisma.proveedores.findFirst({
            where:{
                id:Number(params.id)
            }
        })
    
        return NextResponse.json({
          proveedor
      });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}

export async function PUT(request: Request , {params}: Params) {
    
    const {nombre,celular,fechaActualizacion} = await request.json();
    try {
        
        const proveedor = await prisma.proveedores.update({
            where:{
                id:Number(params.id)
            },
            data:{
                nombre:nombre,
                celular: celular,
                fechaActualizacion:fechaActualizacion
            }
        })
    
        return NextResponse.json({ data: proveedor }, { status: 200 });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}

export async function DELETE(request: Request , {params}: Params) {
    
  const {estado,fechaActualizacion} = await request.json();
  try {
      
      const proveedor = await prisma.proveedores.update({
          where:{
              id:Number(params.id)
          },
          data:{
              estado:estado, 
              fechaActualizacion:fechaActualizacion
          }
      })
  
      return NextResponse.json({ data: proveedor }, { status: 200 });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
}
