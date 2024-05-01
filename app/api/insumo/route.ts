import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Obtener usuarios que NO tienen relación con cliente, organización ni productor
        const insumos = await prisma.insumo.findMany();

        return NextResponse.json({ data: insumos }, { status: 200 });

      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}

export async function POST(request: Request  ){
    try {
        const { nombre, precio, cantidad } = await request.json();

        const insumo = await prisma.insumo.create({
            data: {
                nombre: nombre,
                precio: precio,
                cantidad: parseInt(cantidad),
            }
        });
      
        return NextResponse.json({insumo}, { status: 200});
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}