'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Editar() {
  const router = useRouter();

  const valor = useSearchParams();
  const id = valor.get('id');
  const [produccion, setProduccion] = useState("");
  const [insumoId, setIdInsumo] = useState("");
  //const [cantidad, setCantidad] = useState("");


  const [insumos, setInsumos] = useState([]);
  const [idProductos, setIdProductos] = useState("");
  const [productos, setProductos] = useState([]);
  const [idProductor, setIdProductor] = useState("");
  const [productores, setProductores] = useState([]);
  const [selectedItems, setSelectedItems] = useState([
    { insumo: "", cantidad: "" },
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
      return value.match(/^\d{2}$/);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/insumosProduccion/${id}`);

        if (response.status === 200) {
          const data = response.data;
          const produccionData = await data.produccion;

          setProduccion(produccionData);
          //setIdInsumo(produccionData)
          
          console.log('Datos de produccion:', produccionData)
        }

      } catch (error) {
        
      }
    };
    fetchData();
  }, [id])

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { insumo: "", cantidad: "" }]);
  };


  const handleProductosChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setIdProductos(selectedValue);
    setProductosValidation(selectedValue ? "valid" : "invalid");
  };

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

    // Crear la lista de insumos con sus cantidades
    const insumosProduccion = selectedItems.map((item) => ({
      Insumo_idInsumo: parseInt(item.insumo),
      cantidad: parseInt(item.cantidad),
    }));

    // Datos para crear una producción
    const productionData = {
      idProductos: parseInt(idProductos),
      idProductor: parseInt(idProductor),
      canrtidad: parseInt(cantidad),
      insumoproduccion: { create: insumosProduccion }, // Relacionar insumosProduccion
    };

    console.log("Datos de Producción a actualizar:", productionData);

    // Envía los datos al servidor para crear la producción
    axios
      .put(`/api/insumosProduccion/${id}`, productionData)
      .then((response) => {
        console.log("Producción actualizado con éxito." );
        router.push('/Produccion/Mostrar');
      })
      .catch((error) => {
        console.error("Error al registrar la producción:", error);
      });
  }

  return (
    <>
      <div className="bg-blanco min-h-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
            {" "}
            Editar Producción{" "}
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
                    onChange={(event) => {
                      const value = event.target.value;
                      const updatedItems = [...selectedItems];
                      updatedItems[index] = {
                        ...selectedItem,
                        insumo: value,
                      };
                      setSelectedItems(updatedItems);
                    }}
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
                    value={selectedItem.cantidad}
                    onChange={(event) => {
                      const value = event.target.value;
                      const updatedItems = [...selectedItems];
                      updatedItems[index] = {
                        ...selectedItem,
                        cantidad: value,
                      };
                      setSelectedItems(updatedItems);
                    }}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddItem}>
                Agregar Insumo
              </button>
            </div>

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
            <div>
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
            </div>
            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </div>
    </>
  );
}