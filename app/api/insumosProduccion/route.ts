import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
      const produccion = await prisma.produccion.findMany({
        include:{
          insumoproduccion: true,
          productos: true,
          productor: true
        }
      });
  
      return NextResponse.json({ data: produccion }, { status: 200 });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
}


export async function POST(request: Request) {
  try {
    // Obtén los datos del cuerpo de la solicitud
    const data = await request.json();

    // Verifica si se proporcionaron los datos necesarios
    

    //Crear una nueva entrada en la tabla 'produccion'
    const nuevaProduccion = await prisma.produccion.create({
      data: {
        idProductos: data.idProductos,
        idProductor: data.idProductor,
        canrtidad: data.canrtidad,
        fechaActualizacion: new Date()
      },
    });

    //Crear las relaciones en la tabla 'insumoproduccion'
    for (const insumo of data.insumoproduccion.create) {
      const insumos = await prisma.insumoproduccion.create({
        data: {
          Insumo_idInsumo: insumo.Insumo_idInsumo,
          Produccion_id: nuevaProduccion.id, // Usamos el ID de la nueva producción
          cantidadEntrada: insumo.CantidadEntrada,
          cantidadSalida: insumo.cantidadSalida,
          cantidadTotal: insumo.CantidadEntrada - insumo.cantidadSalida
          // Agregar otras propiedades según tu modelo
        },
      });

      await prisma.insumo.update({
        where:{
          idInsumo: insumos.Insumo_idInsumo
        },

        data:{
          cantidad: insumos.cantidadTotal,
        }
      })
    }

    return NextResponse.json({ message: data.insumoproduccion }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
