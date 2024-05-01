'use client'
import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import axios from "axios"; 
import { useSearchParams } from "next/navigation";



const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -17.329855,
  lng: -66.224047,
};

export default function Detalles() {
  
  const valor = useSearchParams();
  const id = valor.get('id');
  const [productor, setProductor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/productor/${id}`); 
        if (response.status === 200) {
          const data = response.data;
          setProductor(data.productor);
        } else {
          console.error("Error al obteener al productor");
        }
      } catch (error) {
        console.error( error);
      }
    };

    fetchData();
  }, [id]);

  if (!productor) {
    return <div>Cargando...</div>;
  }

  const parsedLatitud = parseFloat(productor['latitud']);
  const parsedLongitud =parseFloat(productor['longitud']);
  console.log("Mapa " + parsedLatitud, parsedLongitud);

  return (
    <div className="bg-blanco min-h-screen text-black ">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5"> Información del productor </h1>
      <div className=" p-5 border-1 shadow ">
          <div className="mb-5 mt-5">
          <strong>Nombres:</strong> {productor['usuario']['nombre']}
        </div>
        <div className="mb-5">
          <strong>Apellidos:</strong> {productor['usuario']['apellido']}
        </div>
        <div className="mb-5">
          <strong>Correo Electrónico:</strong> {productor['usuario']['correo']}
        </div>
        <div className="mb-5">
          <strong>Celular:</strong> {productor['usuario']['celular']}
        </div>
        <div className="mb-5">
          <strong>Puesto:</strong> {productor['puesto']}
        </div>
        <div className="mb-5">
          <label>Ubicación:</label>
          <div>
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{
                  lat: parsedLatitud || center.lat,
                  lng: parsedLongitud || center.lng,
                }}
                zoom={15}
              >
                {parsedLatitud !== null && parsedLongitud !== null && (
                  <Marker position={{ lat: parsedLatitud, lng: parsedLongitud }} />
                )}
              </GoogleMap>
          </LoadScript>
             
            
          </div>
        </div>
       
      </div>
    </div>
  </div>
  )
}

