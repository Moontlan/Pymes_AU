import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
  try {
      
    console.log(params.id)

    const administrador = await prisma.usuario.findFirst({
      where:{
          id: Number(params.id)
          
      }
    })

    return NextResponse.json({
        administrador
    })

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { nombre, apellido, correo, contrasena, celular, fechaActualizacion } =
    await request.json();

    const updateUsuario = await prisma.usuario.update({
        where: {
            id: Number(params.id),
        },
        data: {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena,
            celular: celular,
            fechaActualizacion: fechaActualizacion,
        },
    });

    return NextResponse.json({ updateUsuario });

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

    const updateUsuario = await prisma.usuario.update({
        where: {
            id: Number(params.id),
        },
        data: {
            estado:estado,
            fechaActualizacion: new Date(new Date().toISOString())
        },
    });

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