"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Image,
  Checkbox,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/app/redux/hooks";

export default function Crear() {
  const [tieneFechaVencimiento, setTieneFechaVencimiento] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const [idCategoria, setIdCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  //Esto seria para el que hizo productor
  const [idProductor, setIdProductor] = useState("");
  const [productores, setProductor] = useState([]);

  const [atributos, setAtributos] = useState<
    { nombre: string; valor: string }[]
  >([{ nombre: "", valor: "" }]);
  const [imagePreviews, setImagePreviews] = useState<
    { src: string; alt: string; file: File }[]
  >([]);
  const [choosenIndex, setChoosenIndex] = useState(0);

  useEffect(() => {
    // Realiza la solicitud a la API utilizando Axios
    axios
      .get("/api/categoria")
      .then((response) => {
        // response.data debe contener la lista de categorías desde tu API
        setCategorias(response.data.data);
      })
      .catch((error) => {
        console.error("Error al cargar categorías desde la API:", error);
      });

    axios
      .get("/api/productor")
      .then((response) => {
        setProductor(response.data.data);
      })
      .catch((error) => {
        console.log("Error al cargar productores desde la API", error);
      });
  }, []);

  //Validaciones 
  const [nombre, setNombreV] = React.useState("");
  const [precio, setPrecioV] = React.useState("");
  const [categoriaValidation, setCategoriaValidation] = useState("invalid");
  const [cantidad , setCantidadV] = React.useState("");
  const [productorValidation, setProductorValidation] = useState("invalid");
  const [hasUploadedImages, setHasUploadedImages] = useState(false);
  const [fechaVencimientoError, setFechaVencimientoError] = useState("La fecha de vencimiento es obligatoria.");
  const [areAttributesValid, setAreAttributesValid] = useState(false);
  //Aca adjuntamos el dato del idProductor
  //const idProductorOri = useAppSelector((state) => state.user.id);
  const idProductorOri = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userId") || "0") as number : 0;

  const handleNameChange = (value:any) => {
    setNombreV(value);
  }
  const handlePriceChange = (value:any) =>{
    setPrecioV(value);
  }
  const handleCantidadChange = (value : any) =>{
    setCantidadV(value);
  }

  const validateAttributes = (attributes: any[]) => {
  return attributes.every((atributo) => {
    return atributo.nombre.trim() !== "" && atributo.valor.trim() !== "";
  });
  };

  const validateNombre = (value: any) => {
    if(typeof value == "string"){
      return value.match(/^[A-Za-z\s]{3,}$/i);
    }
    return false;
  }
  const validatePrecio = (value: any) =>{
    if(typeof value == "string"){
       return value.match(/^[1-9]\d*(\.\d+)?$/);
    }
    return false;
  }



  const validationNombre = React.useMemo(() => {
    if(nombre == " ") return undefined;

    return validateNombre(nombre) ? "valid" : "invalid";
  }, [nombre])

  const validationPrecio = React.useMemo(() => {
    if(precio == " ") return undefined;
    return validatePrecio(precio) ? "valid" : "invalid";
  } , [precio])

 

 
  //Fin de Validacion

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setIdCategoria(selectedValue);
    setCategoriaValidation(selectedValue ? "valid" : "invalid");
  };

  /*
  const handleProductorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setIdProductor(selectedValue);
    setProductorValidation(selectedValue ? "valid" : "invalid");
  };*/

  const router = useRouter();
  
  const MostrarProducto = () => {
    router.push(`/Producto/Mostrar`);
  };

  async function sumbit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const nombre =
      (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const precio =
      (formElements.namedItem("precio") as HTMLInputElement)?.value || "";
    const descripcion =
      (formElements.namedItem("descripcion") as HTMLInputElement)?.value || "";
    
    const atributosArray = atributos.map((atributo) => ({
      nombre: atributo.nombre,
      valor: atributo.valor,
    }));

    let fecha;
    let fechaMysql: any;

    if(fechaVencimiento){
      fecha = new Date(fechaVencimiento);
      fechaMysql = fecha.toISOString().slice(0, 19).replace("T", " ");
    }
    
    const cantidad = 0;

    console.log("CLick en el submit");
    console.log("Imágenes a enviar:", imagePreviews);
    console.log("Atributos:", atributos);
    console.log("Id Categoria", idCategoria);
    console.log("Id Productor", idProductorOri.toString());
    console.log("Fecha Vencimiento", fechaMysql);
    console.log(
      "Nombre: ",
      nombre,
      " Precio: ",
      precio,
      " descripcion: ",
      descripcion,
      " cantidad: ",
      cantidad
     
    );
    const AtributosValidados = validateAttributes(atributos);
    console.log("Atributos " , AtributosValidados);


    if(validationNombre == "invalid"){
      (formElements.namedItem("nombre") as HTMLInputElement).focus();
      return;
    }
    if(validationPrecio == "invalid"){
      (formElements.namedItem("precio") as HTMLInputElement).focus();
      return;
    }

  
    if(categoriaValidation == "invalid"){
      (formElements.namedItem("categoria") as HTMLInputElement).focus();
      return;
    }
   
    if(tieneFechaVencimiento && fechaVencimiento == ""){
      (formElements.namedItem("fecha") as HTMLInputElement).focus();
      return;
    }
    if(!AtributosValidados){
      return;
    }
    // Crear un objeto FormData
    const formData = new FormData();

    // Adjuntar los datos del producto al FormData
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);

    formData.append("cantidad", "0");

    formData.append("idCategoria", idCategoria);

    
    formData.append("idProductor", idProductorOri.toString());

    formData.append("atributos", JSON.stringify(atributosArray));
    if(tieneFechaVencimiento){
      formData.append("fechaVencimineto" , fechaMysql);
    }

    // Adjuntar cada imagen al FormData con un nombre de campo distinto
    imagePreviews.forEach((preview, index) => {
      formData.append(`imagen_${index}`, preview.file);
    });

    formData.append("mainIndex", choosenIndex.toString());
    
    if(validationNombre == "valid" && validationPrecio == "valid" &&  categoriaValidation == "valid"
       || hasUploadedImages || tieneFechaVencimiento && fechaVencimiento == "" && AtributosValidados){
        try {
          // Realizar la solicitud a tu API utilizando axios
         
        const response = await axios.post("/api/producto/", formData );
    
          if (response.status === 200) {
            console.log("Datos y imágenes enviados correctamente a la API");
           
            MostrarProducto();
          
          } else {
            console.error("Error al enviar los datos y las imágenes a la API");
          }
         
        } catch (error) {
          console.error("Error al realizar la solicitud a la API:", error);
        }

    }else{
      console.log("Error en los datos");
    }
   

  }

  useEffect(() => {
    // Este efecto se ejecutará cuando 'tieneFechaVencimiento' cambie
    if (!tieneFechaVencimiento) {
      setFechaVencimiento(""); 
      
   
    }
  }, [tieneFechaVencimiento]);

  function removeImagePreview(index: number): void {
    const updatedImagePreviews = [...imagePreviews];
    updatedImagePreviews.splice(index, 1);
    setImagePreviews(updatedImagePreviews);
     // Actualiza el estado booleano verificando si hay imágenes cargadas
    setHasUploadedImages(updatedImagePreviews.length > 0);
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const files = event.target.files;

    if (files) {
      const newImagePreviews = await Promise.all(
        Array.from(files).map(async (file) => ({
          src: URL.createObjectURL(file),
          alt: file.name,
          file,
        }))
      );
      
      const updatedImagePreviews = [...imagePreviews, ...newImagePreviews];

      setImagePreviews(updatedImagePreviews);
      setHasUploadedImages(true);

      if (choosenIndex === null) {
        setChoosenIndex(0);
      }
    }
  }

  function handleAtributoChange(
    index: number,
    field: "nombre" | "valor",
    value: string
  ): void {
    const updatedAtributos = [...atributos];
    updatedAtributos[index][field] = value;
    setAtributos(updatedAtributos);
  
    // Validate attributes whenever an attribute is added or updated
  const isValid = validateAttributes(updatedAtributos);
  setAreAttributesValid(isValid);

  }

  function addAtributo(): void {
    setAtributos([...atributos, { nombre: "", valor: "" }]);
  }

  function removeAtributo(index: number): void {
    const updatedAtributos = [...atributos];
    updatedAtributos.splice(index, 1);
    setAtributos(updatedAtributos);

      // Validate attributes whenever an attribute is removed
    const isValid = validateAttributes(updatedAtributos);
    setAreAttributesValid(isValid);
  }

  const handleFechaVencimientoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFechaVencimiento(inputValue);
  


    if (inputValue === "") {
      setFechaVencimientoError("La fecha de vencimiento es obligatoria.");
    } else {
      const fechaVencimientoDate = new Date(inputValue);
      const currentDate = new Date();
  
      if (fechaVencimientoDate <= currentDate) {
        setFechaVencimientoError("La fecha de vencimiento debe ser mayor que la fecha actual.");
      } else {
        setFechaVencimientoError(""); // Clear the error message if the date is valid
        
      }
    }
  };

  function Marcador(index: number): void {
    console.log("Holaaaaaaa" + index);
    setChoosenIndex(index);
  }

  return (
    <>
      <div className="bg-blanco h-full text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
            {" "}
            Crear Producto{" "}
          </h1>
          <form
            id="miFormulario"
            method="post"
            className="p-5 border-1 shadow"
            onSubmit={sumbit}
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
                onValueChange={handleNameChange}
              />
            </div>
            <div className="mb-5">
              <Input id="precio"
               key="outside" 
               label="Precio" 
               required
               color={validationPrecio === "invalid" ? "danger" : "success"}
               errorMessage={validationPrecio === "invalid" && "El campo precio es obligatorio"  }
               validationState={validationPrecio}
               onValueChange={handlePriceChange} />
            </div>
            <div className="mb-5">
              <Textarea
                id="descripcion"
                key="outside"
                label="Descripcion"
                required
                color={"success"}
               
              />
            </div>
            <div>
              <Select
                id="categoria"
                label="Categoría"
                placeholder="Selecciona una categoría"
                value={idCategoria}
                onChange={(selectedValue: any) =>
                  handleCategoryChange(selectedValue)
                }
                color={categoriaValidation === "invalid" ? "danger" : "success"}
                errorMessage={categoriaValidation === "invalid" && "Por favor, selecciona una categoría válida"}
                className="mb-5 max-w-xs"
              >
                {categorias.map((category) => (
                  <SelectItem
                    className="text-black"
                    key={category["idCategoria"]}
                    value={category["idCategoria"]}
                  >
                    {category["nombre"]}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/*<div className="mb-5">
              <Input type="file" onChange={handleFile}  />
                </div>*/}

            <div className="mb-5">
              <Input type="file" onChange={handleFileChange} multiple />
            </div>

            <div className="mb-5">
              <h2>Imágenes seleccionadas:</h2>
              <div className="flex flex-wrap">
                {imagePreviews.length > 0 && (
                  <div className="mb-5">
                   
                    <div className="flex flex-wrap">
                    <RadioGroup
                            label="Selecciona tu imagen principal:" value={choosenIndex.toString()}>
                      {imagePreviews.map((image, index) => (
                        <div key={index} className="flex-shrink-0 mr-2">
                          <Image
                            src={image.src}
                            alt={`Previsualización ${index + 1}`}
                            width={200}
                            height={200}
                          />
                          <button
                            type="button"
                            className="bg-red-500 text-white mr-10 p-5"
                            onClick={() => removeImagePreview(index)}
                          >
                            Eliminar
                          </button>

                        
                          <Radio value={index.toString()} onChange={() => Marcador(index)} >Seleccionar como imagen principal</Radio>
                            
                          
                        );


                        </div>
                      ))}
                    </RadioGroup>
                    </div>
                   
                  </div>
                  
                )}
              </div>
              
            </div>
            {!hasUploadedImages && (
              <p className="text-danger">Por favor, suba al menos una imagen</p>
            )}
            <div className="mb-5">
            <label>
              <Checkbox
                type="checkbox"
                checked={tieneFechaVencimiento}
                onChange={(e) => setTieneFechaVencimiento(e.target.checked)}
              />{" "}
              Tiene Fecha de Vencimiento
            </label>
          </div>
          {tieneFechaVencimiento && (
              <div>
                <Input
                  type="text"
                  label="Fecha de Vencimiento - Nombre"
                  value="Fecha de Vencimiento"
                  disabled
                />
                <Input
                  id="fecha"
                  className="w-1/4"
                  type="date"
                  label="Fecha de Vencimiento - Valor"
                  placeholder="Ingrese la fecha de vencimiento"
                  value={fechaVencimiento}
                  onChange={handleFechaVencimientoChange}
                  errorMessage={fechaVencimientoError} // Use the error message state
                  color={fechaVencimientoError ? "danger" : "success"}
                />
              </div>
            )}
            <div className="mb-5">
              <h2>Atributos:</h2>

              {atributos.map((atributo, index) => (
                <div key={index} className="mb-2">
                  <Input
                    type="text"
                    label={`Atributo ${index + 1} - Nombre`}
                    value={atributo.nombre}
                    onChange={(e) =>
                      handleAtributoChange(index, "nombre", e.target.value)
                    }
                    color={atributo.nombre.trim() !== "" ? "success" : "danger"}
                    errorMessage={atributo.nombre.trim() === "" ? "Este campo es obligatorio" : ""}
                  />
                  <Input
                    type="text"
                    label={`Atributo ${index + 1} - Valor`}
                    value={atributo.valor}
                    onChange={(e) =>
                      handleAtributoChange(index, "valor", e.target.value)
                    }
                    color={atributo.valor.trim() !== "" ? "success" : "danger"}
                    errorMessage={atributo.valor.trim() === "" ? "Este campo es obligatorio" : ""}
                  />
                  <button type="button" onClick={() => removeAtributo(index)}>
                    Eliminar Atributo
                  </button>
                </div>
              ))}

             
              <button type="button" onClick={addAtributo}>
                Agregar Atributo
              </button>
            </div>
            <Button type="submit"  >Enviar</Button>
          </form>
        </div>
      </div>
    </>
  );
}