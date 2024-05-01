import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";


export async function GET() {
    try {
        const organizaciones = await prisma.usuario.findMany({
          where: {
            estado: 1,
            organizacion: {
              NOT: {
                idOrganizacion: {
                  equals: undefined
                },
              },
            },
          },
          include: {
            organizacion: true,
          },
        });
    
        return NextResponse.json({ data: organizaciones }, { status: 200 });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}

export async function POST(request: Request  ){
    try {
        const { nombre, correo, apellido,contrasena, celular, fechaActualizacion, latitud, longitud, crearProductos, nit } = await request.json();
      
        const result = await prisma.$transaction(async (transaction: any) => {
          const usuario = await transaction.usuario.create({
            data: {
              nombre: nombre,
              apellido:apellido,
              correo: correo,
              contrasena: contrasena,
              celular: celular,
              fechaActualizacion: fechaActualizacion
            }
          });
      
          const organizacion = await transaction.organizacion.create({
            data: {
              idOrganizacion: usuario.id,
              latitud: latitud.toString(), // Convertir latitud a cadena
              longitud: longitud.toString(), // Convertir longitud a cadena
              crearProductos: crearProductos,
              nit: nit
            }
          });
      
          return { usuario, organizacion };
        });
      
        return NextResponse.json(result);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}
