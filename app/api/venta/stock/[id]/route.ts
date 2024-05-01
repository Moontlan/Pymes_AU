import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { cantidad } = await request.json();

    const updatedProducto = await prisma.productos.update({
      where: {
        idProductos: Number(params.id),
      },
      data: {
        cantidad: {
          decrement: cantidad, // Restar la cantidad proporcionada
        },
        fechaActualizacion: new Date(new Date().toISOString()),
      },
    });

    return NextResponse.json({
      updatedProducto,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}