'use client'
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Button, Progress } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter, useSearchParams } from "next/navigation";

import { text } from "node:stream/consumers";
import { CircularProgress } from "@nextui-org/react";
import router from "next/navigation";


const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: -17.329855,
  lng: -66.224047,
};

interface User {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  celular: string;
  estado: number;
  fechaActualizacion: Date;
}

interface Organization {
  latitud: number;
  longitud: number;
  nit: string;
  crearProductos: number;
}

export default function Editar() {

  const [crearProductos, setCrearProductos] = React.useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter); 
  const axios = require('axios');
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = useState(null);
  const valor = useSearchParams();
  const id = valor.get('id');

  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [nit, setNit] = useState<string>("");

  const router = useRouter();

  //Validacion Nombre
 
  const handleNombreChange = (value:any) => {
    setNombre(value);
  };
  const validateNombre = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo letras (mayúsculas y minúsculas) y espacios
      return value.match(/^[A-Za-z\s]{3,}$/i);
    }
    return false;
  };
  const validationNombre = React.useMemo(() => {
    if (nombre === " ") return undefined;

    return validateNombre(nombre) ? "valid" : "invalid" ;

  }, [nombre]);

  //Validacion Apellido
  const handleApellidoChange = (value:any) => {
    setApellido(value);
  };
  
  const validationApellido = React.useMemo(() => {
    if (apellido === " ") return undefined;

    return validateNombre(apellido) ? "valid" : "invalid" ;

  }, [apellido]);

  const handleCrearProductosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrearProductos(event.target.checked);
  };

  //Validacion Correo
  const handleCorreoChange = (value:any) => {
    setCorreo(value);
  };
  const validateCorreo = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo letras (mayúsculas y minúsculas) y espacios
      return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    }
    return false;
  };
  const validationCorreo = React.useMemo(() => {
    if (correo === " ") return undefined;

    return validateCorreo(correo) ? "valid" : "invalid" ;

  }, [correo]);
  
  //Validacion de Celular 
  const handleCelularChange = (value:any) => {
    setCelular(value);
  };
  const validateCelular = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo números
      return value.match(/^\d{8}$/);
    }
    return false;
  };
  const validationCelular = React.useMemo(() => {
    if (celular === " ") return undefined;

    return validateCelular(celular) ? "valid" : "invalid" ;

  }, [celular]);

  //Validacion del Nit

  const handleNitChange = (value:any) => {
    setNit(value);
  };
  const validationNit = React.useMemo(() => {
    if (nit === " ") return undefined;

    return validateCelular(nit) ? "valid" : "invalid" ;

  }, [nit]);


  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
        const newMarker = event.latLng.toJSON();
      
        setMarkers([newMarker]);

        setMapCenter(newMarker);
       
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/organizacion/${id}`);
        if (response.status === 200) {
          const data = await response.data;
          const organizacionData = await data.organizacion;
          setOrganization(organizacionData);
          
         
          if (organizacionData['crearProductos'] === 1) {
            setCrearProductos(true);
          }
         
         const organizationCenter = {
          lat: parseFloat(organizacionData['latitud']),
          lng: parseFloat(organizacionData['longitud']),
        };
        setMapCenter(organizationCenter);
          setMarkers([{ lat: parseFloat(organizacionData['latitud']), lng: parseFloat(organizacionData['longitud']) }]);
          setNombre(organizacionData['usuario']['nombre'] || "");
          setApellido(organizacionData['usuario']['apellido'] || "");
          setCorreo(organizacionData['usuario']['correo'] || "");
          setContrasena(organizacionData['usuario']['contrasena'] || "");
          setCelular(organizacionData['usuario']['celular'] || "");
          setNit(organizacionData['nit'] || "");

          console.log(organizacionData)
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
        return  
        <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    }
    
   
    
  
    const MostrarOrganizacion = () => {
      //router.push(`/Organizacion/Mostrar`);
      window.location.href = "/Organizacion/Mostrar";
    };
    

   
  

  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    const formElements = event.currentTarget.elements;
    var crear = 0;
    const id = (formElements.namedItem("id") as HTMLInputElement)?.value || "";
    const apellido = "";
    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const correo = (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
    const contrasena = (formElements.namedItem("contrasena") as HTMLInputElement)?.value || "";
    const celular = (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
    const nit = (formElements.namedItem("nit") as HTMLInputElement)?.value || "";
    const fechaActualizacion = new Date();
    if(crearProductos == true){
      crear = 1;
    }else{
      crear = 0;
    }

   

    const user: User = {
      
      nombre,
      apellido,
      correo,
      contrasena,
      celular,
      estado: 1,
      fechaActualizacion: new Date(new Date().toISOString()), 
    };

    const organization: Organization = {
      latitud: markers[0]?.lat || 0,
      longitud: markers[0]?.lng || 0,
      nit,
      crearProductos: crear,
    };

    
    console.log({user: user} )
    console.log({organization: organization} )

    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
      return;
    }

  

    if(validationCorreo == "invalid"){
      (formElements.namedItem("correo") as HTMLInputElement).focus();
      return;
    }

    if(validationCelular == "invalid"){
      (formElements.namedItem("celular") as HTMLInputElement).focus();
      return;
    }

    if(validationNit == "invalid"){
      (formElements.namedItem("nit") as HTMLInputElement).focus();
      return;
    }

    if(validationNombre == "valid" && validationCelular == "valid" && validationCorreo == "valid" && validationNit == "valid"){
      try {
        const response = await axios.put(`/api/organizacion/${id}`, {
          nombre: user.nombre,
          apellido:user.apellido,
          correo: user.correo,
          contrasena: user.contrasena,
          celular: user.celular,
          fechaActualizacion: user.fechaActualizacion,
          latitud:  organization.latitud.toString(),
          longitud: organization.longitud.toString(),
          crearProductos: organization.crearProductos,
          nit: organization.nit,
  
        });
    
        if (response.status === 200) {
          // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito o redirige a otra página
          setIsLoading(false);
        
          MostrarOrganizacion();
  
  
        } else {
          // Maneja la respuesta en caso de error aquí
          console.error('Error al actualizar:', response.data);
        }
      } catch (error) {
        // Maneja los errores de red o del servidor aquí
        console.error('Error en la solicitud PUT:', error);
      }
    }
   



  }


  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Organizacion </h1>
        <form className=" p-5 border-1 shadow " onSubmit={handleSubmit}>

        <div hidden className="mb-5 mt-5" >
           
           <Input  id="id" key="outside" type="text" label="ID"  value={organization['idOrganizacion']}  />
          
         </div>

          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required value={nombre} 
             onChange={(event) => setNombre(event.target.value)} 
             color={validationNombre === "invalid" ? "danger" : "success"}
             errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
             validationState={validationNombre}
             onValueChange={handleNombreChange}
             />
           
          </div>

          {/* <div className="mb-5 mt-5">
           
           <Input id="apellido" key="outside" type="text" label="Apellido" required 
           value={apellido} 
            onChange={(event) => setApellido(event.target.value)} 
            color={validationApellido === "invalid" ? "danger" : "success"}
            errorMessage={validationApellido === "invalid" && "El campo nombre es obligatorio y solo letras"  }
            validationState={validationApellido}
            onValueChange={handleApellidoChange}
            />
          
         </div> */}
          <div className="mb-5">
         
            <Input id="correo" key="outside" type="gmail" label="Gmail" required 
            value={correo} 
            onChange={(event) => setCorreo(event.target.value)}
            color={validationCorreo === "invalid" ? "danger" : "success"}
            errorMessage={validationCorreo === "invalid" && "El campo nombre es obligatorio y solo letras"  }
            validationState={validationCorreo}
            onValueChange={handleCorreoChange}
            />
          </div>
          <div hidden className="mb-5">
            <Input
              id="contrasena"
              key="outside"
              type={isVisible ? "text" : "password"}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Contraseña"
              required 
              value={ contrasena}
              onChange={(event) => setContrasena(event.target.value)}
            />
          </div>
          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" required 
            value={celular} 
            onChange={(event) => setCelular(event.target.value)}
            color={validationCelular === "invalid" ? "danger" : "success"}
            errorMessage={validationCelular === "invalid" && "El campo nombre es obligatorio y solo letras"  }
            validationState={validationCelular}
            onValueChange={handleCelularChange}
            />
          </div>
          <div className="mb-5">
            <label>Ubicación:</label>
            <div style={mapContainerStyle}>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={15}
                  onClick={handleMapClick}
                  
                >
                
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                  ))}
                 
                </GoogleMap>  
            </LoadScript>
               
            </div>
          </div>
          <div className="mb-5">
            <Checkbox id="crearProductos" color="success" defaultSelected={crearProductos}  onChange={handleCrearProductosChange}  >
              Crear Productos
            </Checkbox>

          </div>
          <div className="mb-5">
            <Input id="nit" key="outside" label="Nit" required  
            value={ nit} 
            onChange={(event) => setNit(event.target.value)}
            color={validationNit === "invalid" ? "danger" : "success"}
            errorMessage={validationNit === "invalid" && "El campo nombre es obligatorio y solo letras"  }
            validationState={validationNit}
            onValueChange={handleNitChange}
            />
          </div>
          <Button type="submit" color="primary">
           {isLoading ? (
            <CircularProgress aria-label="Loading..." />
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
