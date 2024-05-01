import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtener usuarios que NO tienen relación con cliente, organización ni productor
    const administradores = await prisma.usuario.findMany({
        where: {
            estado: 1,
        },
        include: {
            cliente: true,
            organizacion: true,
            productor: true,
        },
    });

    // Filtrar los administradores que no tienen relación con cliente, organización ni productor
    const administradoresSinRelacion = administradores.filter((admin:any) => {
        return !admin.cliente && !admin.organizacion && !admin.productor;
    });

    return NextResponse.json({ data: administradoresSinRelacion }, { status: 200 });

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: Request  ){
    try {
        const { nombre, correo, apellido,contrasena, celular, fechaActualizacion } = await request.json();

        const administrador = await prisma.usuario.create({
            data: {
                nombre: nombre,
                apellido:apellido,
                correo: correo,
                contrasena: contrasena,
                celular: celular,
                fechaActualizacion: fechaActualizacion
            }
        });
        
        return NextResponse.json({administrador}, { status: 200});
        } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}