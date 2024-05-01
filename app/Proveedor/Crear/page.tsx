'use client'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import React from 'react'
import { useRouter } from "next/navigation";



interface Provedores {
  nombre: string;
  celular: string;
  fechaActualizacion:Date
  
}
export default function Crear() {
  const router = useRouter();

  //Validacion
  const [nombre, setNombre] = React.useState("");
  const [celular, setCelular] = React.useState("");
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
  //Validacion del Celular

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





  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const celular = (formElements.namedItem("celular") as HTMLInputElement)?.value || "";

    const fechaActualizacion = new Date();
    const mysqlFormattedDate = fechaActualizacion.toISOString().slice(0, 19).replace('T', ' ');
    const proveedor: Provedores = {
     nombre,
     celular,   
     fechaActualizacion: fechaActualizacion
    };


    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
      return;
    }

    if(validationCelular == "invalid"){
      (formElements.namedItem("celular") as HTMLInputElement).focus();
      return;
    }

    if(validationNombre == "valid" && validationCelular == "valid"){
      try {
        const resp = await axios.post('/api/proveedor/', {
          nombre: proveedor.nombre,
          celular: proveedor.celular,
          fechaActualizacion:fechaActualizacion
  
        });
    
        if (resp && resp.data) {
         router.push('/Proveedor/Mostrar')
        }
      
      }catch(error){
        console.log('Error al inserte un proveedor');
      }  
    }

    

  }

  return (
    <>
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Proveedor </h1>
        <form className=" p-5 border-1 shadow " method="Post" onSubmit={handleSubmit} >
          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required 
              color={validationNombre === "invalid" ? "danger" : "success"}
              errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
              validationState={validationNombre}
              onValueChange={handleNombreChange} />
            
          </div>
          
          
          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" required 
              color={validationCelular === "invalid" ? "danger" : "success"}
              errorMessage={validationCelular === "invalid" && "El campo nombre es obligatorio y solo numeros"  }
              validationState={validationCelular}
              onValueChange={handleCelularChange}/>
          </div>
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
    </>
  )
}
