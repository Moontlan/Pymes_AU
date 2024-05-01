import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const cliente = await prisma.cliente.findFirst({
      where: {
        idCliente: Number(params.id),
      },
      include: {
        usuario: true,
      },
    });

    return NextResponse.json({
      cliente,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const {
      nombre,
      apellido,
      correo,
      contrasena,
      celular,
      direccion,
    } = await request.json();

    const [updateUsuario, updateCliente] = await prisma.$transaction([
      prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          nombre: nombre,
          apellido: apellido,   
          correo: correo,
          contrasena: contrasena,
          celular: celular,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
      prisma.cliente.update({
        where: {
          idCliente: Number(params.id),
        },
        data: {
            idCliente: Number(params.id),
         direccion: direccion,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
    ]);

    return NextResponse.json({
      updateUsuario,
      updateCliente,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { estado } = await request.json();

    const [updateUsuario, updateCliente] = await prisma.$transaction([
      prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          estado: estado,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
      prisma.cliente.update({
        where: {
          idCliente: Number(params.id),
        },
        data: {
          estado: estado,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
    ]);

    return NextResponse.json({
      updateUsuario,
      updateCliente,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}