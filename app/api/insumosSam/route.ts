import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const insumo = await prisma.insumo.findMany();

    return NextResponse.json({data:insumo} ,{status:200});
} catch (error) {
    console.log(error);
    return NextResponse.json({error} ,{status:500});
}
}