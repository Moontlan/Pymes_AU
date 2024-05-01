import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function GET( request: NextRequest  ) {
  
    try {
        let userRatingString = request.cookies.get('userId')?.value;
        let userRating: number | undefined;
    
        if (userRatingString) {
          userRating = parseFloat(userRatingString);
        }

        const venta = await prisma.detalleventas.findMany({
            where: {
              estado: 1,
              productos:{
                idProductor:userRating
              }

            },
            include:{
                productos:true,
                venta:{
                    include:{
                        cliente:{
                            include:{
                                usuario:true
                            }
                        }
                    }
                }
            }
          })
  
      
          return NextResponse.json({
            venta
        })
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }