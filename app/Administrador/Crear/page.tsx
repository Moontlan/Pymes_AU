"use client";
import React, { useRef, useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import crypto from "crypto";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";

interface User {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  celular: string;
  estado: number;
  fechaActualizacion: Date;
}

export default function Crear() {
  const [CorreoU, setOrganization] = useState(null);
  const [correoExiste, setCorreoExiste] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //Validacion
  const correoInputRef = useRef<HTMLInputElement | null>(null);
  const [correo, setValue] = React.useState("");
  const [nombre, setNombreV] = React.useState("");
  const [apellido, setApellidoV] = React.useState("");
  const [celular, setCelularV] = React.useState("");

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
    const passwordLength = 12; // Puedes ajustar la longitud de la contraseña según tus necesidades
    const randomBytes = crypto.randomBytes(passwordLength);
    const password = randomBytes.toString("base64").slice(0, passwordLength);
    return password;
  };
  //Generar la contraseña aleatoria

  contraseña = generateRandomPassword();

  //Icono del Password
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formElements = event.currentTarget.elements;
    var crear = 0;

    
    const nombre =
      (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const apellido =
      (formElements.namedItem("apellido") as HTMLInputElement)?.value || "";
    const correo =
      (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
    const celular =
      (formElements.namedItem("celular") as HTMLInputElement)?.value || "";

    const fechaActualizacion = new Date();

   
    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
    }
    if(validationApellido == "invalid"){
      (formElements.namedItem("apellido") as HTMLInputElement).focus();
    }
    if(validationState == "invalid"){
      (formElements.namedItem("correo") as HTMLInputElement).focus();
    }
    if(validationCelular == "invalid"){
      (formElements.namedItem("celular") as HTMLInputElement).focus();
    }

    const mysqlFormattedDate = fechaActualizacion
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const user: User = {
      nombre,
      apellido,
      correo,
      contrasena: contraseña,
      celular,
      estado: 1,
      fechaActualizacion: new Date(),
    };

    console.log({ user: user });

    try {
      
      const resp = await axios.get(`/api/verificarCorreo/${correo}`);
      const data = resp.data;
      setOrganization(data.organizacion);

      console.log("Correo" + data.organizacion);


     
      if (data.organizacion == null ) {
        if(validationApellido == "valid" && validationNombre == "valid" && validationCelular == "valid" && validationState == "valid" ){
          setIsLoading(true);
          try {
            const resp = await axios.post("/api/administrador/", {
              nombre: user.nombre,
              apellido: user.apellido,
              correo: user.correo,
              contrasena: user.contrasena,
              celular: user.celular,
              fechaActualizacion: fechaActualizacion,
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
              
              try {
                const response = await axios.post("/api/sendEmail/", {
                  gmail: user.correo,
                  contraseña: contraseña,
                });
  
                if (response.status === 200) {
                  setIsLoading(false);
                  
                  window.location.href = '/Administrador/Mostrar';
                } else {
                  console.error("Error al enviar el correo electrónico");
                }
              } catch (error) {
                console.error("Error al enviar el correo electrónico:", error);
              }
            }
          } catch (error) {}
        }
        
      } else {
        console.log("Este correo ya fue registrado");
        setCorreoExiste(true);
        (formElements.namedItem("correo") as HTMLInputElement).focus();
        
      }
    
    } catch (error) {

    }
    
  };

  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
          {" "}
          Crear Administrador{" "}
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
          <div className="mb-5">
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
          </div>
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