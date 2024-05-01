import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface DetalleVenta {
    idProducto: number;
    cantidad: number;
    nit: string;
    precioUnitario: number;
    importe: number;
  }

export async function POST(request: Request) {
    try {
      // Extrae los datos necesarios del cuerpo de la solicitud
      const {
        idCliente,
        total,
        detalleventas,
      } = await request.json();

      console.log("......");
  
      const result = await prisma.$transaction(async (transaction: any) => {
        // Crea la venta
        const venta = await transaction.venta.create({
          data: {
            idCliente: idCliente,
            total: total,
          },
        });

        console.log("ventaaaaaaaaaaaaaa ",venta);
        // Crea los detalles de venta asociados
        const detalleVentas = await Promise.all(
          detalleventas.map(async (detalle: DetalleVenta) => {
            const detalleVenta = await transaction.detalleventas.create({
              data: {
                idVenta: venta.id,
                idProducto: detalle.idProducto,
                cantidad: detalle.cantidad,
                nit: detalle.nit,
                precioUnitario: detalle.precioUnitario,
                inporte: detalle.importe,
                fechaActualizacion: new Date(), 
                fechaRegistro: new Date(),
                estado: 1,
                

              },
            });
            return detalleVenta;
          })
        );
  
        return { venta, detalleVentas };
      });
  
      return NextResponse.json(result);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    } 
  }