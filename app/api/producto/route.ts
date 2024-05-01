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
    const producto = await prisma.productos.findMany({
      where: {
        estado: 1,
        idProductor: userRating
      },
      include:{
        ruta:true,
        categoria: true,
        atributo: true
      }
    })

    
    return NextResponse.json({ data: producto }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}


export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extraer los campos del formulario
    const nombre = formData.get('nombre');
    const precio = formData.get('precio');
    const descripcion = formData.get('descripcion');
    const cantidad = formData.get('cantidad');
    const idCategoria = formData.get('idCategoria');
    const idProductor = formData.get('idProductor');
    const fechaVencimientoValue  = formData.get('fechaVencimineto');
    const mainIndex = formData.get('mainIndex');
    let fechaVencimiento: Date | undefined;

    if (fechaVencimientoValue && typeof fechaVencimientoValue === 'string') {
      // Convertir la cadena de fecha a un objeto de fecha
      fechaVencimiento = new Date(fechaVencimientoValue);
    }

    // Extraer los atributos del cuerpo de la solicitud como un JSON
    const atributosJSON = formData.get('atributos');
    const atributos = atributosJSON ? JSON.parse(atributosJSON as string) : [];

    // Crear el producto en la base de datos
    const nuevoProducto = await prisma.productos.create({
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

    await Promise.all(
      atributos.map(async (atributo: { nombre: string; valor: string }) => {
        await prisma.atributo.create({
          data: {
            nombre: atributo.nombre,
            valor: atributo.valor,
            idProducto: nuevoProducto.idProductos, // Asociar el atributo con el producto recién creado
          },
        });
      })
    );

     // Procesar imágenes
     const urls: string[] = [];

     for (let index = 0; ; index++) {
       const fieldName = `imagen_${index}`;
       const imageData = formData.get(fieldName);
 
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
 
     // Guardar las URL de las imágenes en la base de datos
     await Promise.all(
       urls.map(async (url) => {
         await prisma.ruta.create({
           data: {
             ruta: url,
             idProducto: nuevoProducto.idProductos,
             fechaActualizacion: new Date().toISOString(),
             
           },
         });
       })
     );

    return NextResponse.json({ message: nuevoProducto.idProductos }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

// import prisma from "@/lib/prisma";
// import { data } from "autoprefixer";
// import { NextRequest, NextResponse } from "next/server";
 
 
// export async function GET( request: NextRequest  ) {
 
//   try {
//     let userRatingString = request.cookies.get('userId')?.value;
//     let userRating: number | undefined;
 
//     if (userRatingString) {
//       userRating = parseFloat(userRatingString);
//     }
//     const producto = await prisma.productos.findMany({
//       where: {
//         estado: 1,
//         idProductor: userRating
//       },
//       include:{
//         ruta:true,
//         categoria: true,
//         atributo: true
//       }
//     })
 
//     return NextResponse.json({ data: producto }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }
//   }
// }
 
 
// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
 
//     // Extraer los campos del formulario
//     const nombre = formData.get('nombre');
//     const precio = formData.get('precio');
//     const descripcion = formData.get('descripcion');
//     const cantidad = formData.get('cantidad');
//     const idCategoria = formData.get('idCategoria');
//     const idProductor = formData.get('idProductor');
//     const fechaVencimientoValue  = formData.get('fechaVencimineto');
//     const mainIndex = formData.get('mainIndex');
//     let fechaVencimiento: Date | undefined;
 
//     if (fechaVencimientoValue && typeof fechaVencimientoValue === 'string') {
//       // Convertir la cadena de fecha a un objeto de fecha
//       fechaVencimiento = new Date(fechaVencimientoValue);
//     }
 
//     // Extraer los atributos del cuerpo de la solicitud como un JSON
//     const atributosJSON = formData.get('atributos');
//     const atributos = atributosJSON ? JSON.parse(atributosJSON as string) : [];
 
//     // Crear el producto en la base de datos
//     const nuevoProducto = await prisma.productos.create({
//       data: {
//         nombre: nombre as string,
//         precio: parseFloat(precio as string),
//         descripcion: descripcion as string,
//         cantidad: parseInt(cantidad as string),
//         idCategoria: parseInt(idCategoria as string),
//         idProductor: parseInt(idProductor as string),
//         fechaActualizacion: new Date(new Date().toISOString()),
//         fechaVencimiento: fechaVencimiento || null,
//         mainIndex: parseInt(mainIndex as string),
//       },
//     });
 
//     await Promise.all(
//       atributos.map(async (atributo: { nombre: string; valor: string }) => {
//         await prisma.atributo.create({
//           data: {
//             nombre: atributo.nombre,
//             valor: atributo.valor,
//             idProducto: nuevoProducto.idProductos, // Asociar el atributo con el producto recién creado
//           },
//         });
//       })
//     );
 
//      // Procesar imágenes
//      const urls: string[] = [];
 
//      for (let index = 0; ; index++) {
//        const fieldName = `imagen_${index}`;
//        const imageData = formData.get(fieldName);
 
//        if (!imageData) {
//          // Si no se encuentra más información bajo ese campo, sal del bucle
//          break;
//        }
 
//        // Convertir la imagen a un formato que puedas usar, como Blob
//        const imageBlob = new Blob([imageData as unknown as Buffer], { type: 'image/jpeg' });
 
//        // Crear un nuevo FormData para la imagen y agregarla a él
//        const imageFormData = new FormData();
//        imageFormData.append('file', imageBlob, 'image.jpg');
//        imageFormData.append('upload_preset', 'test_pymes');
       
 
//        // Subir la imagen a Cloudinary (o realizar la acción deseada con la imagen)
//        const response = await fetch(
//          'https://api.cloudinary.com/v1_1/di9vckxy5/image/upload',
//          {
//            method: 'POST',
//            body: imageFormData,
//          }
//        );
 
//        if (response.ok) {
//          const responseData = await response.json() as { secure_url: string };
//          const imageUrl = responseData.secure_url;
//          urls.push(imageUrl);
//          console.log("Imagen subida a Cloudinary:", imageUrl);
//        }
//      }
 
//      // Guardar las URL de las imágenes en la base de datos
//      await Promise.all(
//        urls.map(async (url) => {
//          await prisma.ruta.create({
//            data: {
//              ruta: url,
//              idProducto: nuevoProducto.idProductos,
//              fechaActualizacion: new Date().toISOString(),
//              //mainIndex: parseInt(mainIndex as string),
//            },
//          });
//        })
//      );
 
//     return NextResponse.json({ message: nuevoProducto.idProductos }, { status: 200 });
//   } catch (error) {
//     console.error('Error al procesar la solicitud:', error);
//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }
//   }
// }