

'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
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
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu función GET aquí
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/organizacion/${id}`); // Usa axios.get en lugar de fetch
        if (response.status === 200) {
          const data = response.data;
          setOrganization(data.organizacion);
        } else {
          console.error("Error al obtener la organización");
        }
      } catch (error) {
        console.error("Error al obtener la organización:", error);
      }
    };

    fetchData();
  }, []);

  if (!organization) {
    return <div>Cargando...</div>;
  }

  const parsedLatitud = parseFloat(organization['latitud']);
  const parsedLongitud =parseFloat(organization['longitud']);
  console.log("Mapa " + parsedLatitud, parsedLongitud);

  return (
    <div className="bg-blanco min-h-screen text-black ">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5"> Visualizar Organización </h1>
      <div className=" p-5 border-1 shadow ">
          <div className="mb-5 mt-5">
          <strong>Nombre:</strong> {organization['usuario']['nombre']}
        </div>
        
        <div className="mb-5">
          <strong>Gmail:</strong> {organization['usuario']['correo']}
        </div>
        <div className="mb-5">
          <strong>Nit:</strong> {organization['nit']}
        </div>
        <div className="mb-5">
          <label>Ubicación:</label>
          <div style={mapContainerStyle}>
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
