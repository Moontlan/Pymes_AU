'use client'
import { Button, Input, Progress } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

interface Categoria {
  nombre: string;
  
}

export default function Editar() {
  const router = useRouter();
  //Atributos
  const axios = require('axios');
  const [category, setCategory] = useState(null);
  const valor = useSearchParams();
  const id = valor.get('id');
  const [nombre, setNombreV] = React.useState("");

  //#region Validacion Nombre
  const handleNombreChange = (value:any) => {
    setNombreV(value);
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
  //#endregion

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/categoria/${id}`);
        if (response.status === 200) {
          const data = await response.data;
          const categoriaData = await data.categoria;

          setCategory(categoriaData);
          setNombreV(categoriaData['nombre']);

          console.log(categoriaData)
        } else {
          console.error("Error al obtener la Categoria");
        }
      } catch (error) {
        console.error("Error al obtener la Categoria:", error);
      }
    };
        fetchData();
    }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";

    const categoria: Categoria = {
      nombre 
    };

    if(validationNombre == "valid"){
      try {
        const response = await axios.put(`/api/categoria/${id}`, {
          nombre: categoria.nombre,
        });
    
        if (response.status === 200) {
          // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito o redirige a otra página
         
          router.push('/Categoria/Mostrar');
  
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

  if (!category) {
    return  
    <Progress
    size="sm"
    isIndeterminate
    aria-label="Loading..."
    className="max-w-md"
  />
}


  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Editar Categoria </h1>
        <form className=" p-5 border-1 shadow " onSubmit={handleSubmit}>

        <div className="mb-5 mt-5 hidden" >
           
           <Input id="id" key="outside" type="text" label="ID"  value={category['id']}  />
         </div>

          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required value={nombre} 
             onChange={(event) => setNombreV(event.target.value)} 
             color={validationNombre === "invalid" ? "danger" : "success"}
             errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
             validationState={validationNombre}
             onValueChange={handleNombreChange}
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