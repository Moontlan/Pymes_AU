import jwt from "jsonwebtoken"; //npm i --save-dev @types/jsonwebtoken
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import SHA256Crypt from '@/hash';

interface Params {
  params: { correo: string };
}

function generateToken(userId: number): string {
  const secret = "pymes123"; // clave secreta
  const expiresIn = "1h"; // Caducidad del token
  const token = jwt.sign({ userId }, secret, { expiresIn });
  return token;
}

// Función para el inicio de sesión
export async function POST(request: Request) {
  try {
    const body = await request.json();
    var role: number;

    //console.log(body);

    const usuario = await prisma.usuario.findFirst({
      where: {
        correo: body.correo,
        //contrasena: body.contrasena,
        estado: 1,
      },
    });

    if(usuario){
      const password = usuario?.contrasena;

      const partes = password.split('$');
      const salt = partes[2];

      // Realizar verificación de contraseña
      const nuevoHash = SHA256Crypt.Hash(body.contrasena, salt);

      if(password!=nuevoHash){
        throw new Error("Contraseña inválida");
      }
      
    } else {
      throw new Error("Correo inválido");
    }

    // Verificar si se encontró un usuario


    // Verificar el tipo de usuario
    const org = await prisma.organizacion.findFirst({
      where: {
        idOrganizacion: usuario.id,
      },
    });
    const prod = await prisma.productor.findFirst({
      where: {
        idProductor: usuario.id,
      },
    });
    const cli = await prisma.cliente.findFirst({
      where: {
        idCliente: usuario.id,
      },
    });

    if (org) {
      //Rol de organizacion
      role = 1;
    } else if (prod) {
      //Rol de productor
      role = 2;
    } else if (cli) {
      //Rol de cliente
      role = 3;
    } else {
      //Rol de administrador
      role = 0;
    }

    // Generar y devolver un token JWT
    const token = generateToken(usuario.id);
    return NextResponse.json(
      { user: usuario, token: token, role: role },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  }
}

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: {
        estado: 1,
      },
    });

    return NextResponse.json({ data: usuarios }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
