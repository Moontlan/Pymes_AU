import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        
        console.log(params.id)
    
        const insumo = await prisma.insumo.findFirst({
          where:{
              idInsumo: Number(params.id)
          }
        })

        return NextResponse.json({ insumo })

    } catch (error) {
    console.log(error);
    if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { nombre, precio, cantidad } = await request.json();

        const updateInsumo = await prisma.insumo.update({
            where: {
                idInsumo: Number(params.id),
            },
            data: {
                nombre: nombre,
                precio: precio,
                cantidad: parseInt(cantidad),
            },
        });

        return NextResponse.json({ updateInsumo });

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}


export async function DELETE(request: Request, { params }: Params) {
    try {
        const insumoId = Number(params.id);

        // Verificar si el insumo existe antes de eliminarlo
        const insumo = await prisma.insumo.findUnique({
        where: {
            idInsumo: insumoId,
        },
        });

        if (!insumo) {
        return NextResponse.json({ message: "El insumo no existe" }, { status: 404 });
        }

        // Eliminar el insumo
        await prisma.insumo.delete({
        where: {
            idInsumo: insumoId,
        },
        });

        return NextResponse.json({ message: "Insumo eliminado con éxito" }, { status: 200 });

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}