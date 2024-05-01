"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, Image } from '@nextui-org/react';
import { Container } from "postcss";

export default function Detalles() {
  const valor = useSearchParams();
  const id = valor.get("id");
  const [products, setProducts] = useState(null);
  const [rutaData, setRutaData] = useState([]); 
  const [atributoData, setAtributoData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/producto/${id}`);
        if (response.status === 200) {
          const data = response.data;
          console.log(data.productos.atributo)
          setProducts(data.productos);
          setRutaData(data.productos.ruta);
          setAtributoData(data.productos.atributo);
        } else {
          console.log("Error al obtener el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };
    fetchData();
  }, []);

  if (!products) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="bg-blanco min-h-screen text-black">
        <div className="mx-auto max-w-5xl p-5 border rounded shadow-lg">
          <h1 className="text-black text-3xl text-center font-bold mb-8 mt-5">
            Visualizar Producto
          </h1>

          <div className="mb-5">
            <strong>Nombre:</strong> {products["nombre"]}
          </div>
          <div className="mb-5">
            <strong>Precio:</strong> {products["precio"]}
          </div>
          <div className="mb-5">
            <strong>Descripcion:</strong> {products["descripcion"]}
          </div>
          <div className="mb-5">
            <strong>Categoria:</strong> {products["categoria"]["nombre"]}
          </div>
          <div className="mb-5">
            <strong>Cantidad:</strong> {products["cantidad"]}
          </div>
          {products["fechaVencimiento"] && (
            <div className="mb-5">
              <strong>Fecha de Vencimiento:</strong> {products["fechaVencimiento"]}
            </div>
          )}

          <div className="mb-5">
            <strong>Imagenes:</strong>
            <div className="flex flex-wrap">
              {rutaData.map((rutaItem, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                  <Image
                    src={rutaItem["ruta"]}
                    alt={`Image ${index}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <strong>Atributos:</strong>
            <ul>
              {atributoData.map((atributoItem, index) => (
                <li key={index} className="mb-2">
                  <strong>{atributoItem["nombre"]}:</strong>{" "}
                  {atributoItem["valor"]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

