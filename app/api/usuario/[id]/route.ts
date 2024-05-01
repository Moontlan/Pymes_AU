import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
      const usuario = await prisma.usuario.findFirst({
        where: {
          id: Number(params.id),
        }
      });
  
      return NextResponse.json({
        usuario,
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
      apellidos,
      correo,
      celular,
    } = await request.json();

    const [updateUsuario,] = await prisma.$transaction([
      prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          nombre: nombre,
          apellido: apellidos,
          correo: correo,
          celular: celular,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
      
    ]);

    return NextResponse.json({
      updateUsuario,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}


// Actualizar contraseña
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { contrasena } = await request.json();

    const [updateUsuario] = await prisma.$transaction([
      prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          contrasena: contrasena,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
    
    ]);

    return NextResponse.json({
      updateUsuario,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
