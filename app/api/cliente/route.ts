import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        estado: 1,
      },

      include: {
        usuario: true,
      },
    });

    return NextResponse.json({ data: clientes }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request) {
  try {
    const {
      nombre,
      correo,
      apellido,
      contrasena,
      celular,
    
      direccion,
    } = await request.json();

    const result = await prisma.$transaction(async (transaction: any) => {
      const usuario = await transaction.usuario.create({
        data: {
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          contrasena: contrasena,
          celular: celular,
          fechaRegistro: new Date(),
          fechaActualizacion: new Date(),
        },
      });

      const cliente = await transaction.cliente.create({
        data: {
          idCliente: usuario.id,
          direccion: direccion,
         fechaActualizacion: new Date()
        },
      });

      return { usuario, cliente };
    });

    return NextResponse.json(result);
  } catch (error) {
    alert(error);
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}