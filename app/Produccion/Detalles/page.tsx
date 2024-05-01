"use client";
import { data } from "autoprefixer";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Image } from '@nextui-org/react';

export default function Detalles() {
  const valor = useSearchParams();
  const id = valor.get("id");
  const [produccion, setProduccion] = useState(null);

  const [insumosData, setAtributosData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/insumosProduccion/${id}`);
        if (response.status === 200) {
          const data = response.data;
          
          console.log(data.produccion.insumoproduccion)
          setProduccion(data.produccion);
          setAtributosData(data.produccion.insumoproduccion);
         
        } else {
          console.log("Error al obtener el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };
    fetchData();

    
  }, []);
  if (!produccion) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <div className="bg-blanco min-h-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5">
            {" "}
            Visualizar Producto{" "}
          </h1>
          <div className=" p-5 border-1 shadow ">
            <div className="mb-5 mt-5">
              <strong>Nombre:</strong> {produccion['productos']["nombre"]}
            </div>
            <div className="mb-5">
              <strong>Precio:</strong> {produccion['productor']["puesto"]}
            </div>
          


         
            

            <div className="mb-5">
              <strong>Insumos Usados:</strong>
              <ul>
                {insumosData.map((insumoItem, index) => (
                  <li key={index}>
                    <strong>{insumoItem['insumo']["nombre"]}:</strong>{" "}
                    {insumoItem["cantidadSalida"]}
                  </li>
                ))}
              </ul>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}

