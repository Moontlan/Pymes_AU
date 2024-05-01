
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        
        console.log(params.id)
    
        const organizacion = await prisma.organizacion.findFirst({
            where:{
                idOrganizacion: Number(params.id)
                
            },
            include: {
                usuario: true, // Cargar usuarios relacionados
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const { nombre, apellido,correo, contrasena, celular, fechaActualizacion, latitud, longitud, crearProductos, nit } =
      await request.json();

    const [updateUsuario, updateOrganizacion] = await prisma.$transaction([
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
          fechaActualizacion: fechaActualizacion,
        },
      }),
      prisma.organizacion.update({
        where: {
          idOrganizacion: Number(params.id),
        },
        data: {
          idOrganizacion: Number(params.id),
          latitud: latitud.toString(), // Convertir latitud a cadena
          longitud: longitud.toString(), // Convertir longitud a cadena
          crearProductos: crearProductos,
          nit: nit,
        },
      }),
    ]);

    return NextResponse.json({
      updateUsuario,
      updateOrganizacion,
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
    const {  estado } = await request.json();

    const [updateUsuario] = await prisma.$transaction([
      prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          estado: estado,
          fechaActualizacion: new Date(new Date().toISOString())
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
