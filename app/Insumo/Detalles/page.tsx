'use client'
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useSearchParams } from "next/navigation";


export default function Detalles() {
  
  const valor = useSearchParams();
  const id = valor.get('id');
  const [insumo, setInsumo] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu función GET aquí
    const fetchData = async () => {
      try {
      
        const response = await axios.get(`/api/insumo/${id}`); // Usa axios.get en lugar de fetch
        if (response.status === 200) {
          
          const data = response.data;
         
          setInsumo(data.insumo);
        } else {
          console.error("Error al obtener el proveedor");
        }
      } catch (error) {
        console.error("Error al obtener el proveedor:", error);
      }
    };

    fetchData();
  }, []);

  
  if (!insumo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-blanco min-h-screen text-black ">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5"> Visualizar Insumo </h1>
      <div className=" p-5 border-1 shadow ">
          <div className="mb-5 mt-5">
          <strong>Nombre:</strong> {insumo['nombre']}
        </div>
      
        <div className="mb-5">
          <strong>Precio:</strong> {insumo['precio']}
        </div>

        <div className="mb-5">
          <strong>Cantidad:</strong> {insumo['cantidad']}
        </div>
       
      </div>
    </div>
  </div>
  )
}
