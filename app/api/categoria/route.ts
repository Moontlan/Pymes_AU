import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {

  
    try {

        const proveedor = await prisma.categoria.findMany();
         
        
    
        return NextResponse.json({ data: proveedor }, { status: 200 });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}

export async function POST(request: Request) {
    try {
        const {nombre} =  await request.json();

        const proveedor = await prisma.categoria.create({
            data:{
                nombre: nombre
            }
        })
    
        return NextResponse.json({ proveedor }, { status: 200 });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}