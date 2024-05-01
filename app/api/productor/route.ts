// Importa tus modelos de Prisma
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const productores = await prisma.productor.findMany({
        where: {
          estado: 1,
        },
  
        include: {
          usuario: true,
        },
      });
  
      return NextResponse.json({ data: productores }, { status: 200 });
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
        fechaActualizacion,
        celular,
        latitud,
        longitud,
        puesto,
        idOrganizacion,
      } = await request.json();
  
      const result = await prisma.$transaction(async (transaction: any) => {
        const usuario = await transaction.usuario.create({
          data: {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena,
            celular: celular,
            fechaActualizacion: fechaActualizacion
          },
        });
  
        const productor = await transaction.productor.create({
          data: {
            idProductor: usuario.id,
            puesto: puesto,
            latitud: parseFloat(latitud),
            longitud: parseFloat(longitud),
            idOrganizacion: idOrganizacion,
            fechaActualizacion: fechaActualizacion
          },
        });
  
        return { usuario, productor };
      });
  
      return NextResponse.json(result);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }