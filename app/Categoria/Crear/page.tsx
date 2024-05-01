'use client'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import React, {useState, useMemo} from 'react'
import { useRouter } from 'next/navigation';
//import { useRouter} from 'next/router';

interface Categoria {
  nombre: string;
  
}

export default function Crear() {
 
  //Validacion
  const router = useRouter();
  const [nombre, setNombreV] = React.useState("");

  const handleNameChange = (value:any) => {
    setNombreV(value);
  }

  const validateNombre = (value: any) => {
    if(typeof value == "string"){
      return value.match(/^[A-Za-z\s]{3,}$/i);
    }
    return false;
  }
  
  const validationNombre = React.useMemo(() => {
    if(nombre == " ") return undefined;

    return validateNombre(nombre) ? "valid" : "invalid";
  }, [nombre])

  // // Wrap localStorage usage in a check for the existence of window
  // const myData = typeof window !== 'undefined' ? localStorage.getItem('myData') : null;

  //Fin de validacion
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";

    const categoria: Categoria = {
      nombre
    }

    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
      return;
    }

    if(validationNombre == "valid"){

      try {
        const resp = await axios.post('/api/categoria/', {
          nombre: categoria.nombre       
        });
    
        if (resp && resp.data) {
          
          router.push('/Categoria/Mostrar');
         
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
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Categorias </h1>
        <form className=" p-5 border-1 shadow " method="Post"  onSubmit={handleSubmit}>
          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required 
              color={validationNombre === "invalid" ? "danger" : "success"}
              errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
              validationState={validationNombre}
              onValueChange={handleNameChange}
               />
            
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
