import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
 
interface Params{
    params: {id:string};
}
 
export async function GET(request:Request, {params}: Params) {
  try {
    const productoId = Number(params.id);
    const productos = await prisma.productos.findFirst({
      where:{
        idProductos: productoId,
      },
      include:{
        ruta:true,
        categoria: true,
        atributo: true,
      }
    });
 
    if (!productos) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }
 
    return NextResponse.json({productos})
 
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
 
export async function PUT(request: Request, {params}: Params) {
  try {
    const formData = await request.formData();
    const productoId = Number(params.id); // Identificador del producto a actualizar

    console.log("formData: ",formData);
    console.log("productoId: ",productoId);
 
    // Procesa los campos a actualizar, por ejemplo: nombre, precio, descripción, etc.
    const nombre = formData.get('nombre');
    const precio = formData.get('precio');
    const descripcion = formData.get('descripcion');
    const cantidad = formData.get('cantidad');
    const idCategoria = formData.get('idCategoria');
    const idProductor = formData.get('idProductor');
    const fechaVencimientoValue = formData.get('fechaVencimineto');
    const mainIndex = formData.get('mainIndex');
    let fechaVencimiento: Date | undefined;
 
    if (fechaVencimientoValue && typeof fechaVencimientoValue === 'string') {
      // Convertir la cadena de fecha a un objeto de fecha
      fechaVencimiento = new Date(fechaVencimientoValue);
    }
 
    const atributosJSON = formData.get('atributos');
    const atributos = atributosJSON ? JSON.parse(atributosJSON as string) : [];    
 
    const productoActualizado = await prisma.productos.update({
      where: { idProductos: productoId },
      data: {
        nombre: nombre as string,
        precio: parseFloat(precio as string),
        descripcion: descripcion as string,
        cantidad: parseInt(cantidad as string),
        idCategoria: parseInt(idCategoria as string),
        idProductor: parseInt(idProductor as string),
        fechaActualizacion: new Date(new Date().toISOString()),
        fechaVencimiento: fechaVencimiento || null,
        mainIndex: parseInt(mainIndex as string),
      },
    });

    // Eliminar los atributos existentes
    await prisma.atributo.deleteMany({
      where: {
        idProducto: productoActualizado.idProductos,
      },
    });

    // Insertar los nuevos atributos
    await prisma.atributo.createMany({
      data: atributos.map((atributo: { idAtributo: number; nombre: string; valor: string }) => ({
        nombre: atributo.nombre,
        valor: atributo.valor,
        idProducto: productoActualizado.idProductos,
      })),
    });
 
    // Procesar imágenes
    const urls: string[] = [];
 
    for (let index = 0; ; index++) {
      const fieldName = `imagen_${index}`;
      const imageData = formData.get(fieldName);

      console.log("imagenData: ",imageData);
      console.log("fieldName: ",fieldName);
 
      if (!imageData) {
        // Si no se encuentra más información bajo ese campo, sal del bucle
        break;
      }
 
      // Convertir la imagen a un formato que puedas usar, como Blob
      const imageBlob = new Blob([imageData as unknown as Buffer], { type: 'image/jpeg' });
 
      // Crear un nuevo FormData para la imagen y agregarla a él
      const imageFormData = new FormData();
      imageFormData.append('file', imageBlob, 'image.jpg');
      imageFormData.append('upload_preset', 'test_pymes');
 
      // Subir la imagen a Cloudinary (o realizar la acción deseada con la imagen)
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dx3ex26da/image/upload',
        {
          method: 'POST',
          body: imageFormData,
        }
      );
 
      if (response.ok) {
        const responseData = await response.json() as { secure_url: string };
        const imageUrl = responseData.secure_url;
        urls.push(imageUrl);
        console.log("Imagen subida a Cloudinary:", imageUrl);
      }
    }
    // await Promise.all(
    //   urls.map(async (url) => {
    //     await prisma.ruta.create({
    //       data: {
    //         ruta: url,
    //         idProducto: productoActualizado.idProductos,
    //         fechaActualizacion: new Date().toISOString(),
    //         //mainIndex: parseInt(mainIndex as string),
    //       },
    //     });
    //   })
    // );

    const dbRutas = await prisma.ruta.findMany({
      where: {
        idProducto: productoId,
      },
    });

    const rutasEnviadas = urls;
    console.log('Rutas Enviadas:', rutasEnviadas);

    if (rutasEnviadas.length > 0) {
      // Compare imagePreviews with existing routes
      const routesToDelete = dbRutas.filter((dbRuta: any) => !rutasEnviadas.includes(dbRuta.ruta));
      const routesToAdd = rutasEnviadas.filter((ruta: any) => !dbRutas.some((dbRuta: any) => dbRuta.ruta === ruta));

      // Delete routes that are not in rutasEnviadas
      await Promise.all(
        routesToDelete.map(async (ruta: any) => {
          await prisma.ruta.delete({
            where: {
              id: ruta.id,
            },
          });
        })
      );

      // Insert new routes that are not in dbRutas
      await Promise.all(
        routesToAdd.map(async (nuevaRuta: any) => {
          await prisma.ruta.create({
            data: {
              ruta: nuevaRuta,
              idProducto: productoId,
              fechaActualizacion: new Date().toISOString(),
            },
          });
        })
      );

      // Debugging: Log the updated routes after deletion and insertion
      const updatedDbRutas = await prisma.ruta.findMany({
        where: {
          idProducto: productoId,
        },
      });

      console.log('Rutas en DB actualizadas:', updatedDbRutas);
    }

    return NextResponse.json({ message: 'Producto actualizado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  
}
 
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { estado } = await request.json();
 
    const updateProducto = await prisma.productos.update({
        where: {
            idProductos: Number(params.id),
        },
        data: {
            estado:estado,
            fechaActualizacion: new Date(new Date().toISOString())
        },
    });
 
    return NextResponse.json({
      updateProducto,
    });
 
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}