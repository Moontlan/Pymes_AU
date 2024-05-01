

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {idProductos:string};
}

export async function PUT(request: Request, { params }: Params) {
    try {
      const { nombre, precio , descripcion , idCategoria, cantidadActual ,cantidadNueva, idProductor , estado , fechaRegistro ,fechaVencimiento } =
        await request.json();
  
      const Producto = await prisma.productos.update({
        where: {
            idProductos: Number(params.idProductos),
          },
        data: {
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            idCategoria:idCategoria,
            cantidad: Number.parseInt(cantidadActual) + Number.parseInt(cantidadNueva),
            idProductor: idProductor,
            estado: estado,
            fechaRegistro: fechaRegistro,
            fechaActualizacion:  new Date(new Date().toISOString()),
            fechaVencimiento: fechaVencimiento

          },
      })
  
      return NextResponse.json({
       Producto,
      });
      console.log(Producto);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }
  