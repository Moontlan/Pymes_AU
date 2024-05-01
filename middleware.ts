import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  let cookie = request.cookies.get("userToken");
  //console.log(cookie)

  // if ((request.nextUrl.pathname.startsWith('/Productor')) && cookie == null) {
  //   return NextResponse.rewrite(new URL('/', request.url))
  // }
  if (
    (request.nextUrl.pathname.startsWith("/Categoria") ||
      request.nextUrl.pathname.startsWith("/Insumo") ||
      request.nextUrl.pathname.startsWith("/Organizacion") ||
      request.nextUrl.pathname.startsWith("/Principal") ||
      request.nextUrl.pathname.startsWith("/Produccion") ||
      request.nextUrl.pathname.startsWith("/Producto") ||
      request.nextUrl.pathname.startsWith("/Productor") ||
      request.nextUrl.pathname.startsWith("/Proveedor") ||
      request.nextUrl.pathname.startsWith("/Usuario")) &&
    cookie == null
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/Productores/Mostrar','/Productores/Crear']
// }