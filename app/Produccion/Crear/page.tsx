'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";




export default function ProductionForm() {
  
  const idProductorOriginal = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userId") || "0") : 0;

  const router = useRouter();

  const [insumos, setInsumos] = useState([]);
  const [idProductos, setIdProductos] = useState("");
  const [productos, setProductos] = useState([]);
  const [idProductor, setIdProductor] = useState("");

  const [producto, setProducto] = useState(null);

  const [productores, setProductores] = useState([]);
  const [selectedItems, setSelectedItems] = useState([
    { insumo: "", cantidadEntrada: ""  ,  cantidadSalida: "" , cantidadTotal: ""},
  ]);
  //const [selectedProducto, setSelectedProducto] = useState("");
  const [selectedProductor, setSelectedProductos] = useState("");
  const [cantidadProduccion, setCantidadProduccion] = useState(0);

  //Validacion
  const [cantidad, setCantidadV] = React.useState("");
  const [productosValidation, setProductosValidation] = useState("invalid");


  const [productorValidation, setProductorValidation] = useState("invalid");
  const handleCantidadChange = (value:any) => {
    setCantidadV(value);
  };

  const validateCantidad = (value: any) => {
    if (typeof value === "string") {
      // Esta expresión regular permite solo números
      return value.match(/^\d{2,}$/);
    }
    return false;
  };
  const validationCantidad = React.useMemo(() => {
    if (cantidad === " ") return undefined;

    return validateCantidad(cantidad) ? "valid" : "invalid" ;

  }, [cantidad]);

  useEffect(() => {
    // Obtener la lista de insumos, productos y productores desde tu API
    axios
      .get("/api/insumosSam")
      .then((response) => setInsumos(response.data.data));

    axios
      .get("/api/producto")
      .then((response) => setProductos(response.data.data));

    axios
      .get("/api/productor")
      .then((response) => {
        setProductores(response.data.data);
      })
      .catch((error) => {
        console.log("Error al cargar productores desde la API", error);
      });

      
   

  }, []);

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { insumo: "", cantidadEntrada: "" , cantidadSalida : "" , cantidadTotal: "" }]);
   
  };


  const handleProductosChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setIdProductos(selectedValue);
    setProductosValidation(selectedValue ? "valid" : "invalid");

  };

  useEffect(() => {
    // Este efecto se ejecutará cuando idProductos cambie
    // Realiza la solicitud HTTP y actualiza producto
    axios
      .get(`/api/producto/${idProductos}`)
      .then((response) => {
        setProducto(response.data.productos);
      })
      .catch((error) => {
        console.log("Error al cargar productores desde la API", error);
      });

    console.log("Añaaaaaaaaaa" + producto)
    
  }, [idProductos]);

 

  const handleProductorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setIdProductor(selectedValue);
    setProductorValidation(selectedValue ? "valid" : "invalid");
  };
  
  async function handleSave(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    const cantidad =
      (formElements.namedItem("cantidad") as HTMLInputElement)?.value || "";

    // Validar que la cantidad de salida no sea mayor que la cantidad de entrada
    const isCantidadValid = selectedItems.every((item) => {
      return parseInt(item.cantidadSalida) <= parseInt(item.cantidadEntrada);
    });

    if (!isCantidadValid) {
      // Mostrar un mensaje de error o realizar alguna acción si la validación falla
      console.error('La cantidad de salida no puede ser mayor que la cantidad de entrada');
      return;
    }

    // Crear la lista de insumos con sus cantidades
    const insumosProduccion = selectedItems.map((item) => ({
      Insumo_idInsumo: parseInt(item.insumo),
      CantidadEntrada: parseInt(item.cantidadEntrada),
      cantidadSalida: parseInt(item.cantidadSalida),
      
    }));

    // Datos para crear una producción
    const productionData = {
      idProductos: parseInt(idProductos),
      idProductor: parseInt(idProductorOriginal),
      canrtidad: parseInt(cantidad),
      insumoproduccion: { create: insumosProduccion }, // Relacionar insumosProduccion
      producto: producto
    };

    console.log("Datos de Producción:", productionData );

  

    try {
      const response = await axios.put(`/api/ProductoStock/${idProductos}`, {
        nombre: producto ? producto['nombre'] : undefined,
        precio: producto ? producto['precio'] : undefined,
        descripcion : producto ? producto['descripcion'] : undefined,
        idCategoria :producto ? producto['idCategoria'] : undefined,
        cantidadActual : producto ? producto['cantidad'] : undefined ,
        cantidadNueva: cantidad,
        idProductor : producto ? producto['idProductor'] : undefined,
        estado : producto ? producto['estado'] : undefined,
        fechaRegistro: producto ? producto['fechaRegistro'] : undefined
      });
  
      if (response.status === 200) {
       


      } else {
        // Maneja la respuesta en caso de error aquí
        console.error('Error al actualizar:', response.data);
      }
    } catch (error) {
      // Maneja los errores de red o del servidor aquí
      console.error('Error en la solicitud PUT:', error);
    }



    // Envía los datos al servidor para crear la producción
    
    axios
      .post("/api/insumosProduccion", productionData)
      .then((response) => {
        console.log("Producción registrada con éxito." );
 
        router.push('/Produccion/Mostrar')
      })
      .catch((error) => {
        console.error("Error al registrar la producción:", error);
      });
  }
  const [insumoCantidades, setInsumoCantidades] = useState([]);

   // Función para manejar el cambio en el input de Insumos
   const handleInsumoChange = async (index:any, value:any) => {
    const updatedItems = [...selectedItems];
    updatedItems[index] = {
      ...selectedItems[index],
      insumo: value,
    };
    setSelectedItems(updatedItems);
      
  // Realiza una solicitud para obtener la cantidad de insumos

    const insumoId = parseInt(value);
    if (!isNaN(insumoId)) {
      const response = await axios.get(`/api/insumo/${insumoId}`);
    const cantidadEntrada = response.data.insumo.cantidad; // Ajusta esto según la estructura de tu respuesta
  
    console.log( cantidadEntrada)
    
    // Actualiza el estado de selectedItems con la cantidad de entrada
    updatedItems[index].cantidadEntrada = cantidadEntrada;
    setSelectedItems(updatedItems);
    }
    
  
  
  
  };

  // Función para manejar el cambio en el input de Cantidad
  const handleCantidadChange2 = (index:any, value:any) => {
    const updatedItems = [...selectedItems];
    updatedItems[index] = {
      ...selectedItems[index],
      cantidadSalida: value,
    };
    setSelectedItems(updatedItems);
  };

  return (
    <>
      <div className="bg-blanco min-h-screen min-w-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
            {" "}
            Crear Producción{" "}
          </h1>
          <form
            className="p-5 border-1 shadow"
            method="Post"
            onSubmit={handleSave}
          >
            <div className="mb-5 mt-5">
              {selectedItems.map((selectedItem, index) => (
                <div key={index}>
                  <Select
                    id={`insumos-${index}`}
                    label="Insumos"
                    placeholder="Selecciona un Insumo"
                    value={selectedItem.insumo}
                    onChange={(event) => handleInsumoChange(index, event.target.value)}
                  >
                    {insumos.map((insumo) => (
                      <SelectItem
                        className="text-black"
                        key={insumo["idInsumo"]}
                        value={insumo["idInsumo"]}
                      >
                        {insumo["nombre"]}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Cantidad"
                    placeholder="Ingrese la cantidad"
                    value={selectedItem.cantidadSalida}
                    onChange={(event) => handleCantidadChange2(index, event.target.value)}

                  />
                </div>
              ))}
              <button type="button" onClick={handleAddItem}>
                Agregar Insumo
              </button>
            </div>

            {/* <Input
              label="Cantidad de Producción"
              placeholder="Ingrese la cantidad de producción"
              value={cantidadProduccion.toString()}
              onChange={(event) => setCantidadProduccion(parseInt(event.target.value))}
            /> */}

            <div>
              <Input 
              id="cantidad" 
              key="outside" 
              label="Cantidad" 
              required 
              color={validationCantidad === "invalid" ? "danger" : "success"}
              errorMessage={validationCantidad === "invalid" && "El campo cantidad es obligatorio"  }
              validationState={validationCantidad}
              onValueChange={handleCantidadChange}
              />
            </div>
            <div>
              <Select
                id="productos"
                label="Productos"
                placeholder="Selecciona un Producto"
                value={idProductos}
                onChange={(selectedValue: any) =>
                  handleProductosChange(selectedValue)
                }
                color={productosValidation === "invalid" ? "danger" : "success"}
                errorMessage={productosValidation === "invalid" && "Por favor, selecciona un productor válida"}
                className="mb-5 max-w-xs"
              >
                {productos.map((producto) => (
                  <SelectItem
                    className="text-black"
                    key={producto["idProductos"]}
                    value={producto["idProductos"]}
                  >
                    {producto["nombre"]}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {/* <div>
              <Select
                id="productor"
                label="Productor"
                placeholder="Selecciona un Productor"
                value={idProductor}
                onChange={(selectedValue: any) =>
                  handleProductorChange(selectedValue)
                }
                color={productorValidation === "invalid" ? "danger" : "success"}
                errorMessage={productorValidation === "invalid" && "Por favor, selecciona un productor válida"}
                className="mb-5 max-w-xs"
              >
                {productores.map((productor) => (
                  <SelectItem
                    className="text-black"
                    key={productor["idProductor"]}
                    value={productor["idProductor"]}
                  >
                    {productor["puesto"]}
                  </SelectItem>
                ))}
              </Select>
            </div> */}
            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </div>
    </>
  );
}
