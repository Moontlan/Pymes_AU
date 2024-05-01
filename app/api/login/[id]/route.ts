import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
    try {
      const { contrasena, fechaActualizacion } = await request.json();
      console.log(request.json());
      const updateUsuario = await prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          contrasena: contrasena,
          fechaActualizacion: fechaActualizacion,
        },
      });
  
      return NextResponse.json({
        updateUsuario
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }