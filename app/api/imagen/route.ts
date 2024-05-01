import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

import {v2 as cloudinary} from 'cloudinary';  
cloudinary.config({ 
  cloud_name: 'di9vckxy5', 
  api_key: '546362873599874', 
  api_secret: 'nkYu8kHu3DyBK2QBv4r1rlO3m2I' 
});

export async function POST(request: Request) {
  try {
    // Verificar si hay un archivo en la solicitud
    if (!request.body) {
      return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
    }

    // Leer los datos binarios del flujo y almacenarlos en un Uint8Array
    const chunks: Uint8Array[] = [];
    const reader = request.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
      }
    }

    // Concatenar los fragmentos en un solo Uint8Array
    const fileData = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
      fileData.set(chunk, offset);
      offset += chunk.length;
    }

    // Generar un nombre de archivo único (puedes personalizar esto)
    const fileName = `imagen_${Date.now()}.png`;

    // Construir la ruta completa donde se guardará el archivo en el servidor
    const filePath = path.join(process.cwd(), 'public', fileName);

    // Escribir los datos binarios en el archivo
    await writeFile(filePath, fileData);

    // Subir el archivo a Cloudinary (opcional)
    // const resp = await cloudinary.uploader.upload(filePath);
    // console.log(resp);

    return NextResponse.json("Imagen Subida");
  } catch (error) {
    console.error('Error al procesar la carga de archivos:', error);
    return NextResponse.json("Error al procesar la carga de archivos", { status: 500 });
  }
}
