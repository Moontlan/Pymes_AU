'use client'
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Button, Progress } from "@nextui-org/react";

import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";

interface Insumo {
  nombre: string;
  precio: string;
  cantidad: string;
}

export default function Editar() {

  const router = useRouter();

  const axios = require('axios');

  const [insumo, setInsumo] = useState(null);
  const valor = useSearchParams();
  const id = valor.get('id');

  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [cantidad, setCantidad] = useState<string>("");

  //Validar Nombre   
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
  //Validacion del Precio

  const handlePrecioChange = (value:any) => {
    setPrecio(value);
  };
  const validatePrecio = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo números
      return value.match(/^[1-9]\d*(\.\d+)?$/);
    }
    return false;
  };
  const validationPrecio = React.useMemo(() => {
    if (precio === " ") return undefined;

    return validatePrecio(precio) ? "valid" : "invalid" ;

  }, [precio]);

  //Validacion de la Cantidad
  const handleCantidadChange = (value:any) => {
    setCantidad(value);
  };
  const validateCantidad = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo números
      const regex = /^\d+(\.\d+)?$/;
      return regex.test(value);
    }
    return false;
  };
  const validationCantidad = React.useMemo(() => {
    if (cantidad === " ") return undefined;

    return validateCantidad(cantidad) ? "valid" : "invalid" ;

  }, [cantidad]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/insumo/${id}`);
        if (response.status === 200) {
          const data = await response.data;
          const insumoData = await data.insumo;
          setInsumo(insumoData);
          
          setNombre(insumoData['nombre'] || "");
        
          setPrecio(insumoData['precio'] || "");
          
          setCantidad(insumoData['cantidad'].toString() || "");
         
        } else {
          console.error("Error al obtener la organización");
        }
      } catch (error) {
        console.error("Error al obtener la organización:", error);
      }
    };
        fetchData();
    }, []);

    if (!insumo) {
        return  
        <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    }

  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
   
    const id = (formElements.namedItem("id") as HTMLInputElement)?.value || "";
   
    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
   
    const precio = (formElements.namedItem("precio") as HTMLInputElement)?.value || "";

    const cantidad = (formElements.namedItem("cantidad") as HTMLInputElement)?.value || "";
 
    const insumo: Insumo = {
      nombre,   
      precio,
      cantidad, 
    };

    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
      return;
    }

    if(validationPrecio == "invalid"){
      (formElements.namedItem("precio") as HTMLInputElement).focus();
      return;
    }

    if(validationCantidad == "invalid"){
        (formElements.namedItem("cantidad") as HTMLInputElement).focus();
        return;
      }

    if(validationNombre == "valid" && validationPrecio == "valid" && validationCantidad == "valid"){
      try {
        const response = await axios.put(`/api/insumo/${id}`, {
          nombre: insumo.nombre,
          precio: insumo.precio,
          cantidad: insumo.cantidad,
        });
    
        if (response.status === 200) {
          // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito o redirige a otra página
          console.log('Actualización exitosa:', response.data);
          router.push('/Insumo/Mostrar');
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
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Editar Insumo </h1>
        <form className=" p-5 border-1 shadow " onSubmit={handleSubmit}>

        <div hidden className="mb-5 mt-5" >
           
           <Input id="id" key="outside" type="text" label="ID"  value={insumo['idInsumo']}  />
          
         </div>

          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required 
            value={nombre}  
            onChange={(event) => setNombre(event.target.value)}
            color={validationNombre === "invalid" ? "danger" : "success"}
            errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
            validationState={validationNombre}
            onValueChange={handleNombreChange}
            />
           
          </div>

          <div className="mb-5">
            <Input id="precio" key="outside" label="Precio" required 
            value={precio} 
            onChange={(event) => setPrecio(event.target.value)}
            color={validationPrecio === "invalid" ? "danger" : "success"}
            errorMessage={validationPrecio === "invalid" && "El campo precio es obligatorio y solo numeros"  }
            validationState={validationPrecio}
            onValueChange={handlePrecioChange}
            />
          </div>

          <div className="mb-5">
            <Input id="cantidad" key="outside" label="Cantidad" required 
            value={cantidad} 
            onChange={(event) => setCantidad(event.target.value)}
            color={validationCantidad === "invalid" ? "danger" : "success"}
            errorMessage={validationCantidad === "invalid" && "El campo cantidad es obligatorio y solo numeros"  }
            validationState={validationCantidad}
            onValueChange={handleCantidadChange}
            />
          </div>
        
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
