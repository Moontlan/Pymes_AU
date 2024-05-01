"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import axios from "axios";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";


interface Insumo {
  nombre: string;
  precio: string;
  cantidad: string;
}

export default function Crear() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //Validacion
  const [nombre, setNombreV] = React.useState("");
  const [precio, setPrecioV] = React.useState("");
  const [cantidad, setCantidadV] = React.useState("");

  const handleNombreChange = (value:any) => {
    setNombreV(value);
  };
  const handlePrecioChange = (value:any) => {
    setPrecioV(value);
  };
  const handleCantidadChange = (value:any) => {
    setCantidadV(value);
  };

  const validateNombre = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo letras (mayúsculas y minúsculas) y espacios
      return value.match(/^[A-Za-z\s]{3,}$/i);
    }
    return false;
  };

  const validatePrecio = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo números enteros o decimales
      return /^\d+(\.\d{1,2})?$/.test(value);
    }
    return false;
  };

  const validateCantidad = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo números enteros
        return /^\d+$/.test(value);
    }
    return false;
  };

  const validationNombre = React.useMemo(() => {
    if (nombre === " ") return undefined;
    return validateNombre(nombre) ? "valid" : "invalid" ;
  }, [nombre]);

  const validationPrecio = React.useMemo(() => {
    if (precio === " ") return undefined;
    return validatePrecio(precio) ? "valid" : "invalid" ;
  }, [precio]);

  const validationCantidad = React.useMemo(() => {
    if (cantidad === " ") return undefined;
    return validateCantidad(cantidad) ? "valid" : "invalid" ;
  }, [cantidad]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formElements = event.currentTarget.elements;

    const nombre =
      (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const precio =
      (formElements.namedItem("precio") as HTMLInputElement)?.value || "";
    const cantidad =
      (formElements.namedItem("cantidad") as HTMLInputElement)?.value || "";
   

    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
    }
    if(validationPrecio == "invalid"){
      (formElements.namedItem("precio") as HTMLInputElement).focus();
    }
    if(validationCantidad == "invalid"){
      (formElements.namedItem("cantidad") as HTMLInputElement).focus();
    }

    const insumo: Insumo = {
      nombre,
      precio,
      cantidad,
    };

    console.log({ insumo: insumo });

    try {
    
        if(validationPrecio == "valid" && validationNombre == "valid" && validationCantidad == "valid"){
          setIsLoading(true);
          try {
            const resp = await axios.post("/api/insumo/", {
              nombre: insumo.nombre,
              precio: insumo.precio,
              cantidad: insumo.cantidad,
            });
  
            if (resp && resp.data) {
              // Limpiar los campos del formulario y el mapa, y restablecer el estado de crearProductos
              const nombreInput = formElements.namedItem(
                "nombre"
              ) as HTMLInputElement;
              const precioInput = formElements.namedItem(
                "precio"
              ) as HTMLInputElement;
              const cantidadInput = formElements.namedItem(
                "cantidad"
              ) as HTMLInputElement;

              nombreInput.value = "";
              precioInput.value = "";
              cantidadInput.value = "";

              setPrecioV("");
              setCantidadV("");
              setNombreV("");
              
              try {
                router.push('/Insumo/Mostrar');

              } catch (error) {
                console.error("Error al querer mostrar:", error);
              }
            }
          } catch (error) {}
        }
    
    } catch (error) {

    }
    
  };

  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
          {" "}
          Crear Insumo{" "}
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
              id="precio"
              key="outside"
              type="text"
              label="Precio"
              required
              color={validationPrecio === "invalid" ? "danger" : "success"}
              errorMessage={validationPrecio === "invalid" && "El campo precio es obligatorio y solo números"  }
              validationState={validationPrecio}
              onValueChange={handlePrecioChange}
            />
          </div>
          <div className="mb-5">
            <Input 
              id="cantidad" 
              key="outside" 
              label="Cantidad" 
              required 
              color={validationCantidad === "invalid" ? "danger" : "success"}
              errorMessage={validationCantidad === "invalid" && "El campo cantidad es obligatorio y solo números"  }
              validationState={validationCantidad}
              onValueChange={handleCantidadChange}
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