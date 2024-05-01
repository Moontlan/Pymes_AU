"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import crypto from "crypto";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import * as CryptoJS from 'crypto-js';
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";


const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
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

export default function Crear() {
  const router = useRouter();

  const [crearProductos, setCrearProductos] = React.useState(false);
  const [CorreoU, setOrganization] = useState(null);
  const [correoExiste, setCorreoExiste] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //Validacion
  const correoInputRef = useRef<HTMLInputElement | null>(null);
  const [correo, setValue] = React.useState("");
  const [nombre, setNombreV] = React.useState("");
  const [apellido, setApellidoV] = React.useState("");
  const [celular, setCelularV] = React.useState("");
  const [nit, setNitV] = React.useState("");
  const [mapValid, setMapValid] = React.useState(false);
  

  const handleValueChange = (value:any) => {
    setValue(value);
  };

  const handleNombreChange = (value:any) => {
    setNombreV(value);
  };

  const handleApellidoChange = (value:any) => {
    setApellidoV(value);
  };

  const handleCelularChange = (value:any) => {
    setCelularV(value);
  };
  const handleNitChange = (value:any) => {
    setNitV(value);
  };

  var contraseña: string;

  const validateEmail = (value: any) => {
  if (typeof value === "string") {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  }
    return false; 
  };

  const validateNombre = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo letras (mayúsculas y minúsculas) y espacios
      return value.match(/^[A-Za-z\s]{3,}$/i);
    }
    return false;
  };

  const validateCelular = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo números
      return value.match(/^\d{8}$/);
    }
    return false;
  };

  const generateRandomPassword = () => {
    const passwordLength = 8; // Puedes ajustar la longitud de la contraseña según tus necesidades
    const randomBytes = crypto.randomBytes(passwordLength);
    const password = randomBytes.toString("base64").slice(0, passwordLength);
    return password;
  };
  //Generar la contraseña aleatoria

  contraseña = generateRandomPassword();
  const hashPass = CryptoJS.MD5(contraseña).toString(CryptoJS.enc.Hex);

  const handleCrearProductosChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCrearProductos(event.target.checked);
  };
  //Icono del Password
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = event.latLng.toJSON();
      setMarkers([newMarker]);
      setMapValid(true);
    }
  };

  const validationState = React.useMemo(() => {
    if (correo === " ") return undefined;

    return validateEmail(correo) ? "valid" : "invalid";
  }, [correo]);

  const validationNombre = React.useMemo(() => {
    if (nombre === " ") return undefined;

    return validateNombre(nombre) ? "valid" : "invalid" ;

  }, [nombre]);

  const validationApellido = React.useMemo(() => {
    if (apellido === " ") return undefined;

    return validateNombre(apellido) ? "valid" : "invalid" ;

  }, [apellido]);

  const validationCelular = React.useMemo(() => {
    if (celular === " ") return undefined;

    return validateCelular(celular) ? "valid" : "invalid" ;

  }, [celular]);

  const validationNit = React.useMemo(() => {
    if (nit === " ") return undefined;

    return validateCelular(nit) ? "valid" : "invalid" ;

  }, [nit]);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formElements = event.currentTarget.elements;
    var crear = 0;

    
    const nombre =
      (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const apellido = "";
    const correo =
      (formElements.namedItem("correo") as HTMLInputElement)?.value || "";

    const celular =
      (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
    const nit =
      (formElements.namedItem("nit") as HTMLInputElement)?.value || "";
    const fechaActualizacion = new Date();

   
    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
    }

    

    if(validationState == "invalid"){
      (formElements.namedItem("correo") as HTMLInputElement).focus();
    }

    if(validationCelular == "invalid"){
      (formElements.namedItem("celular") as HTMLInputElement).focus();
    }

    if(validationNit == "invalid"){
      (formElements.namedItem("nit") as HTMLInputElement).focus();
    }

    if (!mapValid) {
      // Si el mapa no es válido, muestra un mensaje de error y no envía el formulario.
      setMapValid(false);
      console.log("No se selecciono el mapa ");
      
    }

   

    if (crearProductos == true) {
      crear = 1;
    } else {
      crear = 0;
    }

    const mysqlFormattedDate = fechaActualizacion
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const user: User = {
      nombre,
      apellido,
      correo,
      contrasena: hashPass,
      celular,
      estado: 1,
      fechaActualizacion: new Date(),
    };

    const organization: Organization = {
      latitud: markers[0]?.lat || 0,
      longitud: markers[0]?.lng || 0,
      nit,
      crearProductos: crear,
    };

    console.log({ user: user });
    console.log({ organization: organization });

    try {
      
      const resp = await axios.get(`/api/verificarCorreo/${correo}`);
      const data = resp.data;
      setOrganization(data.organizacion);

      console.log("Correo" + data.organizacion);


     
      if (data.organizacion == null ) {
        if(validationNombre == "valid" && validationNit == "valid" && validationCelular == "valid" && validationState == "valid" && mapValid ){
          setIsLoading(true);
          var templateParams = {
            from_name: "Totem",
            nombre: user.nombre,
            contrasena: contraseña,
            email: user.correo,
          };
          try {
            emailjs
            .send(
              "service_7xh4aqx",
              "template_soj79xk",
              templateParams,
              "BQzfsMnH6-p-UBfyg"
            )
            const resp = await axios.post("/api/organizacion/", {
              nombre: user.nombre,
              apellido: user.apellido,
              correo: user.correo,
              contrasena: user.contrasena,
              celular: user.celular,
              fechaActualizacion: fechaActualizacion,
              latitud: organization.latitud.toString(),
              longitud: organization.longitud.toString(),
              crearProductos: organization.crearProductos,
              nit: organization.nit,
            });
           
  
            if (resp && resp.data) {
              // Limpiar los campos del formulario y el mapa, y restablecer el estado de crearProductos
              const nombreInput = formElements.namedItem(
                "nombre"
              ) as HTMLInputElement;
              const apellidoInput = formElements.namedItem(
                "apellido"
              ) as HTMLInputElement;
              const correoInput = formElements.namedItem(
                "correo"
              ) as HTMLInputElement;
              const celularInput = formElements.namedItem(
                "celular"
              ) as HTMLInputElement;
              const nitInput = formElements.namedItem("nit") as HTMLInputElement;
  
              nombreInput.value = "";
              apellidoInput.value = "";
              correoInput.value = "";
              celularInput.value =  "";
              nitInput.value = "";
  
              setValue("");
              setApellidoV("");
              setCelularV("");
              setNombreV("");
              setNitV("");   
              // Limpiar el mapa
              setMarkers([]);

              setIsLoading(false);
              //('/Organizacion/Mostrar')
              
              
            
            }
          } catch (error) {}
          finally{
            window.location.href = "/Organizacion/Mostrar";
          }
        }
        
      } else {
        console.log("Este correo ya fue registrado");
        setCorreoExiste(true);
        (formElements.namedItem("correo") as HTMLInputElement).focus();
        
      }
    
    } catch (error) {
        console.log(error);
    }
    
  };

  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
          {" "}
          Crear Organizacion{" "}
        </h1>
        <form
          className=" p-5 border-1 shadow "
          method="Post"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 mt-5">
            <Input
              id="nombre"
              key="outside"
              type="text"
              label="Nombre"
              required
              color={validationNombre === "invalid" ? "danger" : "success"}
              errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
              validationState={validationNombre}
              onValueChange={handleNombreChange}
            />
           
          </div>
          {/* <div className="mb-5">
            <Input
              id="apellido"
              key="outside"
              type="text"
              label="Apellido"
              required
              color={validationApellido === "invalid" ? "danger" : "success"}
              errorMessage={validationApellido === "invalid" && "El campo apellido es obligatorio y solo letras"  }
              validationState={validationApellido}
              onValueChange={handleApellidoChange}
            />
          </div> */}
          <div className="mb-5">
            <Input
              id="correo"
              key="outside"
              type="gmail"
              label="Gmail"
              color={validationState === "invalid" ? "danger" : "success"}
              errorMessage={validationState === "invalid" && "El campo correo es obligatorio"}
              validationState={validationState}
              onValueChange={handleValueChange}

              required
              style={{ borderColor: correoExiste ? "red" : undefined }}
              ref={correoInputRef}
              onFocus={() => {
                const correoError = document.getElementById("correo-error");
                if (correoError) {
                  correoError.style.display = "none";
                }
              }}
              onChange={() => {
                setCorreoExiste(false); // Restablecer el estado a falso cuando cambia el correo
              }}
              
            />
            {correoExiste && (
              <p className="text-red-500" id="correo-error" >Este correo ya existe.</p>
            )}
          </div>
          {/*  <Input
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
            /> */}
          <div className="mb-5"></div>
          <div className="mb-5">
            <Input 
              id="celular" 
              key="outside" 
              label="Celular" 
              required 
              color={validationCelular === "invalid" ? "danger" : "success"}
              errorMessage={validationCelular === "invalid" && "El campo celular es obligatorio"  }
              validationState={validationCelular}
              onValueChange={handleCelularChange}
              />
          </div>
          <div className="mb-5">
            <label>Ubicación:</label>
            <div  style={mapContainerStyle}>
              
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                    onClick={handleMapClick}
                  >
                    {markers.map((marker, index) => (
                      <Marker key={index} position={marker} />
                    ))}
                  </GoogleMap>
              </LoadScript>
                
              
            </div>
            {!mapValid && (
              <p className="text-red-500">Debes seleccionar una ubicación en el mapa.</p>
            )}
          </div>
          <div className="mb-5">
            <Checkbox
              id="crearProductos"
              defaultSelected={crearProductos}
              color="success"
              onChange={handleCrearProductosChange}
            >
              Crear Productos
            </Checkbox>
          </div>
          <div className="mb-5">
            <Input id="nit" key="outside" label="Nit" required 
             color={validationNit === "invalid" ? "danger" : "success"}
             errorMessage={validationNit === "invalid" && "El campo celular es obligatorio"  }
             validationState={validationNit}
             onValueChange={handleNitChange}
             />
          </div>
          <Button type="submit" color="primary" disabled={isLoading}>
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
